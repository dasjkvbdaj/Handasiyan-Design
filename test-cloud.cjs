const cloudinary = require('cloudinary').v2;
cloudinary.config({cloud_name:'du9mfswii',api_key:'721258156485833',api_secret:'G3CMaeSbxWOkdFDbBW0uDU080xE'});
cloudinary.api.resources({ type: 'upload', max_results: 100 }).then(r => console.log(JSON.stringify(r.resources.map(x=>x.public_id)))).catch(console.error);
