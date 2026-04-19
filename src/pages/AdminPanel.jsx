// src/pages/AdminPanel.jsx
import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  Upload,
} from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import StatusModal from "../components/StatusModal";

const CATEGORIES = [
  "Interior Design",
  "Architectural Design",
  "Full Design",
  "Civil Engineering",
  "Construction & Build Management",
  "MEP Engineering",
  "3D Visualization",
];

const AdminProjectCard = ({ project, index, onEdit, onDelete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const images = useMemo(() => {
    if (project.images) {
      const params = isMobile
        ? 'c_limit,w_600,f_auto,q_auto'
        : (isTablet
          ? 'c_limit,w_800,f_auto,q_auto'
          : 'c_limit,w_1000,f_auto,q_auto');
      return project.images.map(id => `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${id}`);
    }
    return project.imageUrls?.map(img => img.url) || [];
  }, [project, cloudName]);

  const paginate = (dir, e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentIdx((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-[#d4af37]/30 transition-all duration-500"
    >
      <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
        {images.length > 0 ? (
          <img
            key={currentIdx}
            src={images[currentIdx]}
            alt={project.name}
            loading={currentIdx === 0 ? 'eager' : 'lazy'}
            fetchPriority={currentIdx === 0 ? 'high' : 'auto'}
            sizes="auto"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10">
            <ImageIcon size={48} />
          </div>
        )}

        {/* Carousel Controls */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => paginate(-1, e)}
              className="p-1.5 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-[#d4af37] hover:text-black transition-all"
            >
              <div className="rotate-180 flex items-center justify-center"><ChevronRight size={16} /></div>
            </button>
            <button
              onClick={(e) => paginate(1, e)}
              className="p-1.5 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-[#d4af37] hover:text-black transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => onEdit(project)}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#d4af37] hover:text-black transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(project)}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all ${i === currentIdx ? 'bg-[#d4af37] w-3' : 'bg-white/30'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37] px-2 py-0.5 rounded-full font-bold">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-1 truncate">{project.name}</h3>
        <p className="text-white/40 text-sm mb-4 line-clamp-1">{project.style}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/20 italic">
            {images.length} Images
          </span>
          <div className="w-8 h-px bg-white/10" />
        </div>
      </div>
    </motion.div>
  );
};

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const [editingProject, setEditingProject] = useState(null);
  
  const [status, setStatus] = useState({
    isOpen: false,
    type: 'loading',
    message: ''
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: CATEGORIES[0],
    style: "",
  });

  // imageItems: { id: string, preview: string, file: File | null, publicId: string | null, status: 'existing' | 'new' | 'replaced', oldPublicId?: string }
  const [imageItems, setImageItems] = useState([]);
  const [deletedPublicIds, setDeletedPublicIds] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(docs);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setStatus({ 
        isOpen: true, 
        type: 'error', 
        message: 'Failed to load projects.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newItems = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      file: file,
      publicId: null,
      status: 'new'
    }));
    setImageItems(prev => [...prev, ...newItems]);
  };

  const handleReplaceImage = (index, file) => {
    const item = imageItems[index];
    const newPreview = URL.createObjectURL(file);

    setImageItems(prev => {
      const updated = [...prev];
      updated[index] = {
        ...item,
        preview: newPreview,
        file: file,
        status: item.status === 'existing' ? 'replaced' : item.status,
        oldPublicId: item.status === 'existing' ? item.publicId : item.oldPublicId
      };
      return updated;
    });
  };

  const removePreviewImage = (index) => {
    const item = imageItems[index];
    if (item.status === 'existing' || item.status === 'replaced') {
      const idToDestroy = item.status === 'existing' ? item.publicId : item.oldPublicId;
      if (idToDestroy) {
        setDeletedPublicIds(prev => [...prev, idToDestroy]);
      }
    }
    setImageItems(prev => prev.filter((_, i) => i !== index));
  };

  // Helper to generate SHA-1 signature for Cloudinary destruction
  const generateSignature = async (publicId, timestamp) => {
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const signatureStr = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

    // Use Web Crypto API for SHA-1 (no external library needed)
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureStr);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const destroyOnCloudinary = async (publicId) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const timestamp = Math.round(new Date().getTime() / 1000);

    try {
      const signature = await generateSignature(publicId, timestamp);
      const formData = new FormData();
      formData.append("public_id", publicId);
      formData.append("timestamp", timestamp);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        formData
      );
    } catch (err) {
      console.error(`Failed to destroy asset ${publicId}:`, err);
      // We don't throw here to allow the loop to continue for other images
    }
  };

  const deleteAssetsSequentially = async (publicIds) => {
    if (!publicIds || publicIds.length === 0) return;
    // Loop through each public ID and remove it in Cloudinary as requested
    for (const id of publicIds) {
      await destroyOnCloudinary(id);
    }
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = "handasiyan_preset";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "handasiyan_project_images");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData
    );
    return response.data.public_id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ 
      isOpen: true, 
      type: 'loading', 
      message: editingProject ? "Updating project..." : "Publishing project..." 
    });

    try {
      const finalPublicIds = [];
      const idsToDelete = [];

      for (let item of imageItems) {
        if (item.status === 'new' || item.status === 'replaced') {
          // Upload new file
          const newId = await uploadToCloudinary(item.file);
          finalPublicIds.push(newId);

          // Queue old one for deletion
          if (item.status === 'replaced' && item.oldPublicId) {
            idsToDelete.push(item.oldPublicId);
          }
        } else {
          // Keep existing
          finalPublicIds.push(item.publicId);
        }
      }

      // Add manually removed images to the deletion queue
      const allDeletions = [...idsToDelete, ...deletedPublicIds];

      // Execute secure deletion
      if (allDeletions.length > 0) {
        await deleteAssetsSequentially(allDeletions);
      }

      // 2. Save to Firestore
      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), {
          ...formData,
          images: finalPublicIds,
          updatedAt: serverTimestamp(),
        });
        setStatus({
          isOpen: true,
          type: 'success',
          message: "Project updated successfully!"
        });
      } else {
        await addDoc(collection(db, "projects"), {
          ...formData,
          images: finalPublicIds,
          createdAt: serverTimestamp(),
        });
        setStatus({
          isOpen: true,
          type: 'success',
          message: "Project added successfully!"
        });
      }

      // Reset
      setFormData({ name: "", category: CATEGORIES[0], style: "" });
      setImageItems([]);
      setDeletedPublicIds([]);
      setEditingProject(null);
      setActiveTab("list");
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);

      // Extract specific error from Cloudinary if available
      let errorMessage = "Failed to save project. Please try again.";

      if (err.response?.data?.error?.message) {
        errorMessage = `Cloudinary Error: ${err.response.data.error.message}`;
      } else if (err.config?.url?.includes('cloudinary')) {
        errorMessage = "Image upload failed. Ensure your files are within Cloudinary's size limits for your plan.";
      }

      setStatus({
        isOpen: true,
        type: 'error',
        message: errorMessage
      });
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Are you sure you want to delete "${project.name}"?`)) return;

    setStatus({
      isOpen: true,
      type: 'loading',
      message: `Deleting "${project.name}"...`
    });

    try {
      // Cleanup all images from Cloudinary via secure API
      const imagesToDelete = project.images || [];
      if (imagesToDelete.length > 0) {
        await deleteAssetsSequentially(imagesToDelete);
      }

      await deleteDoc(doc(db, "projects", project.id));
      setStatus({
        isOpen: true,
        type: 'success',
        message: "Project deleted successfully!"
      });
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setStatus({
        isOpen: true,
        type: 'error',
        message: "Failed to delete project."
      });
    }
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      category: project.category,
      style: project.style,
    });
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    // Normalize existing data to imageItems structure
    let initialItems = [];
    if (project.images) {
      initialItems = project.images.map(id => ({
        id: Math.random().toString(36).substr(2, 9),
        preview: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${id}`,
        file: null,
        publicId: id,
        status: 'existing'
      }));
    } else if (project.imageUrls) {
      // Legacy fallback
      initialItems = project.imageUrls.map(img => ({
        id: Math.random().toString(36).substr(2, 9),
        preview: img.url,
        file: null,
        publicId: null, // Legacy images don't have IDs for destroy
        status: 'existing'
      }));
    }

    setImageItems(initialItems);
    setActiveTab("add");
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setFormData({ name: "", category: CATEGORIES[0], style: "" });
    setImageItems([]);
    setActiveTab("list");
  };

  return (
    <div className="min-h-screen bg-[#030f0a] text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Admin <span className="text-[#d4af37]">Dashboard</span>
            </h1>
            <p className="text-white/50 text-sm tracking-widest uppercase">Manage your architectural masterpieces</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 self-start">
            <button
              onClick={() => { setActiveTab("list"); if (editingProject) cancelEdit(); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "list" ? "bg-[#d4af37] text-black" : "text-white/60 hover:text-white"
                }`}
            >
              <ListIcon size={18} />
              Project List
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "add" ? "bg-[#d4af37] text-black" : "text-white/60 hover:text-white"
                }`}
            >
              <Plus size={18} />
              {editingProject ? "Edit Project" : "Add Project"}
            </button>
          </div>
        </div>

        <StatusModal
          isOpen={status.isOpen}
          type={status.type}
          message={status.message}
          onClose={() => setStatus({ ...status, isOpen: false })}
        />

        {/* Main Content */}
        {activeTab === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-white/30">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p>Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white/5 rounded-[2rem] border border-white/5">
                <ImageIcon className="mx-auto w-12 h-12 text-white/10 mb-4" />
                <p className="text-white/40">No projects found. Add your first one!</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <AdminProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
          >
            {/* Form decorative background */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[#d4af37] text-xs uppercase tracking-[0.2em] font-medium ml-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Modern Villa"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[#d4af37] text-xs uppercase tracking-[0.2em] font-medium ml-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#030f0a]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.2em] font-medium ml-1">
                  Project Style
                </label>
                <input
                  type="text"
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  placeholder="e.g. Minimalist Contemporary"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.2em] font-medium ml-1">
                  Project Images
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imageItems.map((item, i) => (
                    <div key={item.id} className="aspect-square rounded-2xl overflow-hidden relative group border border-white/10 bg-neutral-900">
                      <img src={item.preview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer">
                          <Edit2 size={12} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleReplaceImage(i, e.target.files[0]);
                            }}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removePreviewImage(i)}
                          className="p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      {item.status === 'replaced' && (
                        <div className="absolute bottom-2 left-2 bg-[#d4af37] text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                          Replaced
                        </div>
                      )}
                    </div>
                  ))}

                  <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-[#d4af37]/50 hover:bg-white/5 transition-all text-white/30 hover:text-[#d4af37]">
                    <Upload size={24} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#d4af37] text-black font-bold uppercase tracking-widest py-4 rounded-2xl hover:bg-[#b8962d] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                >
                  {status.isOpen && status.type === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Saving...
                    </>
                  ) : editingProject ? (
                    "Update Project"
                  ) : (
                    "Publish Project"
                  )}
                </button>

                {editingProject && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
