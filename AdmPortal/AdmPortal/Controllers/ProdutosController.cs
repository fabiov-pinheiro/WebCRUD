using AdmPortal.Data;
using AdmPortal.Models;
using AdmPortal.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AdmPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public ProdutosController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetAllProdutos()
        {
            return Ok(dbContext.Produtos.ToList());
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetProdutosById(Guid id)
        {
            var produto = dbContext.Produtos.Find(id);
            if (produto == null)
            {
                return NotFound();
            }
            return Ok(produto);
        }
        
        [HttpPost]
        public IActionResult AddProdutos(AddProdutoDto addProdutoDto) 
        {
            var produtoEntity = new Produto()
            {
                Nome = addProdutoDto.Nome,
                Preco = addProdutoDto.Preco,
                Descricao = addProdutoDto.Descricao
            };
            dbContext.Produtos.Add(produtoEntity);
            dbContext.SaveChanges();
            return Ok(produtoEntity);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateProduto(Guid id, UpdateProdutoDto updateProdutoDto)
        {
            var produto = dbContext.Produtos.Find(id);
            if (produto == null)
            {
                return NotFound();
            }
            produto.Nome = updateProdutoDto.Nome;
            produto.Preco = updateProdutoDto.Preco;
            produto.Descricao = updateProdutoDto.Descricao;
            dbContext.SaveChanges();
            return Ok(produto);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteProduto(Guid id)
        {
            var produto = dbContext.Produtos.Find(id);
            if(produto == null)
            {
                return NotFound();
            }
            dbContext.Produtos.Remove(produto); 
            dbContext.SaveChanges();
            return Ok(produto);
        }
    }
}
