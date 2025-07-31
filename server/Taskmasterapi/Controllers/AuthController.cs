using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Taskmasterapi.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
     private readonly AppDbContext _context;

    public AuthController(IConfiguration config, AppDbContext context)
    {
        _config = config;
        _context = context;
    }

[HttpPost("register")]
public IActionResult Register([FromBody] LoginRequest req)
{
    if (_context.users.Any(u => u.Email == req.Email))
    {
        return BadRequest("Email already exists");
    }
    string hashed = BCrypt.Net.BCrypt.HashPassword(req.Password);

    var user = new User
    {
        Email = req.Email,
        PasswordHash = hashed  // In real apps, hash this
    };

    _context.users.Add(user);
    _context.SaveChanges();

    return Ok("User registered");
}
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        // 🔐 Dummy user (replace with real DB check)
        var user= await _context.users.FirstOrDefaultAsync(u => u.Email == req.Email );

        if (user == null)
        {
            Console.WriteLine("User not found");
            return Unauthorized();
        }
        if (!BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
        {
            Console.WriteLine("Password doesn't match");
            return Unauthorized();
        }

        
            var token = GenerateJwt(req.Email);
            return Ok(new { token });
        

        
    }


    private string GenerateJwt(string email)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

