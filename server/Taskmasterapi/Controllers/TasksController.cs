using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using Taskmasterapi.Data;

[ApiController]
[Route("api/[controller]")]

[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;
    public TasksController(AppDbContext context)
    {
        _context = context;
    }
   // private static List<TaskItem> tasks = new();

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var email = User.Identity?.Name;
        Console.WriteLine("Email from token: " + email);
        var userTasks =await _context.tasks.Where(t => t.UserEmail == email).ToListAsync();
        return Ok(userTasks);
        /*var user = HttpContext.User.Identity.Name;
        if (!User.Identity.IsAuthenticated)
            return Unauthorized("Token missing or invalid");
        return Ok(new { message = $"Hello {user}" });*/
    }
    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] TaskItem task)
    {
        //[FromBody] is used to bind data from the body of the request, typically in JSON or XML format.Posting JSON data to create a new resource.
        if (task == null) return BadRequest();
        task.UserEmail = User.Identity?.Name!;
        await _context.tasks.AddAsync(task);
        await _context.SaveChangesAsync();
        return Ok(task);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskItem updTask)
    {
  var task = await _context.tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserEmail == User.Identity.Name);
        if (task == null) return NotFound();

        task.Title = updTask.Title;
        task.Description = updTask.Description;
        task.IsCompleted = updTask.IsCompleted;
        await _context.SaveChangesAsync();
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserEmail == User.Identity.Name);
        if (task == null) return NotFound();

        _context.tasks.Remove(task);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Task deleted" });
    }
}
