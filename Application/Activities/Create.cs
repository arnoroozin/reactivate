using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using FluentValidation.Validators;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class Create
    {
        public class Command :IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        public class CreateValidator: AbstractValidator<Command>{
            public CreateValidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());

            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context,IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _context = context;
                
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user= await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var atendee=new ActivityAttendee{
                    AppUser=user,
                    ActivityId=request.Activity.Id,
                    Activity=request.Activity, 
                    AppUserId=user.Id,                   
                    IsHost=true,
                };
                request.Activity.attendees.Add(atendee);
                  _context.Activities.Add(request.Activity) ;
                var result= await _context.SaveChangesAsync() > 0;
                if (!result)
                {
                    return Result<Unit>.Failure("Failed toncreate an activity!");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}