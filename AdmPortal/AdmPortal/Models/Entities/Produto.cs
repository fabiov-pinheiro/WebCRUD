namespace AdmPortal.Models.Entities
{
    public class Produto
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public float Preco { get; set; }
        public string? Descricao { get; set; }
    }
}
