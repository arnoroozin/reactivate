using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account=new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
                );
                _cloudinary = new Cloudinary(account);
        }
        public async Task<PhotoUploadResult> AddPhoto(IFormFile formFile)
        {
            if (formFile != null)
            {
                using var stream = formFile.OpenReadStream();
                var uploadParams=new ImageUploadParams{
                    File=new FileDescription(formFile.FileName,stream),
                    Transformation=new Transformation()
                    .Width(500).Height(500).Crop("fill")
                };
                var uploadResult=await _cloudinary.UploadAsync(uploadParams);
                if (uploadResult.Error != null){
                    throw new Exception(uploadResult.Error.Message);
                }
                return new PhotoUploadResult{
                    PublicId=uploadResult.PublicId,
                    Url=uploadResult.SecureUrl.ToString(),
                };
            }
            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deletParams=new DeletionParams(publicId);
            var result=await _cloudinary.DestroyAsync(deletParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}