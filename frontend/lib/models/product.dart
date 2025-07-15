class Product {
  final int? productId;
  final String productName;
  final double price;
  final int stock;

  Product({
    required this.productId,
    required this.productName,
    required this.price,
    required this.stock,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      productId: json['PRODUCTID'] as int?,
      productName: json['PRODUCTNAME'] as String,
      price: json['PRICE'].toDouble(),
      stock: json['STOCK'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {'PRODUCTNAME': productName, 'PRICE': price, 'STOCK': stock};
  }
}
