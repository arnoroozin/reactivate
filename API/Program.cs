using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt=>{
opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnectinstring"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();   



using var scope= app.Services.CreateScope();
var services=scope.ServiceProvider;



try
{
    var context=services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);

}
catch (Exception ex)
{
    
    var logger=services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"error occure during migration");
}

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
