const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'du9mfswii',
  api_key: '721258156485833',
  api_secret: 'G3CMaeSbxWOkdFDbBW0uDU080xE'
});

async function listAssets() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Home/Project-1',
      max_results: 10
    });
    console.log('Assets in Home/Project-1:', JSON.stringify(result.resources, null, 2));
    
    const rootResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Project-1',
      max_results: 10
    });
    console.log('Assets in Project-1 (root):', JSON.stringify(rootResult.resources, null, 2));
  } catch (error) {
    console.error('Error listing assets:', error);
  }
}

listAssets();
