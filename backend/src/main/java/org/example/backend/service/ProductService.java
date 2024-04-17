package org.example.backend.service;
import lombok.RequiredArgsConstructor;
import org.example.backend.model.Product;
import org.example.backend.model.ProductDTO;
import org.example.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repo;
    public List<Product> getAllProducts() {
        return repo.findAll();
    }
    public Product saveProduct(ProductDTO product) {
        return repo.save(new Product(null, product.productName(), product.category(), product.pricePerPiece(), product.producer(), product.quantity()));
    }
    public Product getProductById(String id){return repo.findById(id).orElseThrow();
    }
    public void deleteProductById(String id) {
        repo.deleteById(id);
    }
    public Product updateProduct(String id, ProductDTO productDTO ){
        Product product = getProductById(id);
        product.setProductName(productDTO.productName());
        product.setCategory(productDTO.category());
        product.setPricePerPiece(productDTO.pricePerPiece());
        product.setProducer(productDTO.producer());
        product.setProducer(productDTO.quantity());
        return repo.save(product);
    }
}
