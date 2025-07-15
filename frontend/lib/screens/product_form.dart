import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/product.dart';
import '../providers/product_provider.dart';

class ProductForm extends StatefulWidget {
  final Product? product;
  const ProductForm({super.key, this.product});

  @override
  State<ProductForm> createState() => _ProductFormState();
}

class _ProductFormState extends State<ProductForm> {
  final _formKey = GlobalKey<FormState>();
  String name = '';
  double price = 0;
  int stock = 0;

  @override
  void initState() {
    super.initState();
    if (widget.product != null) {
      name = widget.product!.productName;
      price = widget.product!.price;
      stock = widget.product!.stock;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEdit = widget.product != null;
    final provider = Provider.of<ProductProvider>(context, listen: false);

    return Scaffold(
      appBar: AppBar(title: Text(isEdit ? 'Edit Product' : 'Add Product')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                initialValue: name,
                decoration: InputDecoration(labelText: 'Product Name'),
                validator: (value) => value!.isEmpty ? 'Required' : null,
                onSaved: (value) => name = value!,
              ),
              TextFormField(
                initialValue: price.toString(),
                decoration: InputDecoration(labelText: 'Price'),
                keyboardType: TextInputType.number,
                validator: (value) =>
                    value!.isEmpty || double.tryParse(value) == null
                    ? 'Enter valid price'
                    : null,
                onSaved: (value) => price = double.parse(value!),
              ),
              TextFormField(
                initialValue: stock.toString(),
                decoration: InputDecoration(labelText: 'Stock'),
                keyboardType: TextInputType.number,
                validator: (value) =>
                    value!.isEmpty || int.tryParse(value) == null
                    ? 'Enter valid stock'
                    : null,
                onSaved: (value) => stock = int.parse(value!),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                child: Text(isEdit ? 'Save' : 'Add'),
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    final newProduct = Product(
                      productId: widget.product?.productId,
                      productName: name,
                      price: price,
                      stock: stock,
                    );
                    isEdit
                        ? provider.updateProduct(newProduct)
                        : provider.addProduct(newProduct);
                    Navigator.pop(context);
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
