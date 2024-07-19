namespace AdmPortal.Models
{
    public class AddProdutoDto
    {
        public required string Nome { get; set; }
        public float Preco { get; set; }
        public string? Descricao { get; set; }
    }
}
