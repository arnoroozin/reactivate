using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>{
            public string Id { get; set;}
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context,IUserAccessor userAccessor,IPhotoAccessor photoAccessor)
            {
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
            _context = context;
                
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user=_context.Users.Include(x=>x.Photos).FirstOrDefault(x=>x.UserName == _userAccessor.GetUsername());
                if(user==null) return null;
                var photo=user.Photos.FirstOrDefault(x=>x.Id==request.Id);
                if(photo==null) return null;
                var lastmain=user.Photos.FirstOrDefault(x=>x.IsMain);
                if(lastmain==null) return null;
                lastmain.IsMain=false;
                photo.IsMain=true;
                var result=await _context.SaveChangesAsync()>0;
                if(result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem Setting Main photo");
            }
        }
    }
}