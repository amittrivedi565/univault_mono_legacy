const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dyzzwvrbo', 
    api_key: '352867845183754', 
    api_secret: 'YUpWaCIk8pHC_cDgL3Jy3jdTXFQ' // Click 'View Credentials' below to copy your API secret
  });

  const cloud = async(filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath,{
          resource_type : "auto"
        })
        console.log(result)
        return result
    } catch (error) {
        console.log(error.message)
    }
  }

  
  module.exports = {
    cloud
  }