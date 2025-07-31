

using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string PasswordHash { get; set; } = string.Empty;
}