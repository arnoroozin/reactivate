using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager,TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(x=>x.Photos).FirstOrDefaultAsync(x=>x.Email==loginDto.Email);
            if (user == null)
                return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user,loginDto.Password);
            if(result)
            {
               return CreateUserObject(user);
            }
            return Unauthorized();

        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
            if(await _userManager.Users.AnyAsync(u => u.UserName == registerDto.UserName)){
                ModelState.AddModelError("username", "UserName already taken!");
                return ValidationProblem();
            }
            if(await _userManager.Users.AnyAsync(u => u.Email == registerDto.Email)){
                ModelState.AddModelError("email", "Email already taken!");
                return ValidationProblem();
            }
           var user= new AppUser{
            Email=registerDto.Email,
            DisplayName=registerDto.DisplayName,
            UserName=registerDto.UserName,
           };
            var result=await _userManager.CreateAsync(user,registerDto.Password);
            if (result.Succeeded)
            {
                return CreateUserObject(user);

            }
            return BadRequest(result.Errors);

        }     

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
            var user=await _userManager.Users.Include(x=>x.Photos).FirstOrDefaultAsync(x=>x.Email== User.FindFirstValue(ClaimTypes.Email));
           return CreateUserObject(user);
        }
          private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user?.Photos?.FirstOrDefault(x=>x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
            };
        }
    }
}