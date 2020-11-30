module.exports = function ({
    Address,
    Category,
    Cart,
    City,
    Comentary,
    State,
    Favorite,
    ItemCart,
    ItemSale,
    LandMark,
    Order,
    Photography,
    Question,
    Product,
    Sale,
    Store,
    User,
}) {
    User.hasMany(Address, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    Address.belongsTo(User, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    City.hasMany(Address, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_ciudad" },
    });
    Address.belongsTo(City, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_ciudad" },
    });
    User.hasOne(Store, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id" },
    });
    Store.belongsTo(User, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
        foreignKey: { name: "id" },
    });
    User.hasMany(Order, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    Order.belongsTo(User, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    Product.belongsTo(LandMark, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_marca" },
    });
    Product.belongsTo(State, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_estado" },
    });
    State.hasMany(Product, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_estado" },
    });
    Product.belongsTo(Store, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_tienda" },
    });
    Product.belongsTo(Category, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_categoria" },
    });
    LandMark.hasMany(Product, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_marca" },
    });
    Category.hasMany(Product, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_categoria" },
    });
    Store.hasMany(Product, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_tienda" },
    });
    Photography.belongsTo(Product, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_producto" },
    });
    Product.hasMany(Photography, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_producto" },
    });
    Sale.belongsTo(Order, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_pedido" },
    });
    Sale.belongsTo(Store, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_tienda" },
    });
    Store.hasMany(Sale, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_tienda" },
    });
    Order.hasMany(Sale, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_tienda" },
    });
    Question.belongsTo(User, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    User.hasMany(Question, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    Question.belongsTo(Product, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_producto" },
    });
    Product.hasMany(Question, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_producto" },
    });
    Order.hasMany(ItemSale, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_pedido" },
    });
    Sale.hasMany(ItemSale, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_venta" },
    });
    Product.hasMany(ItemSale, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_producto" },
    });
    User.hasMany(Favorite, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    Product.hasMany(Favorite, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_producto" },
    });
    User.hasMany(Comentary, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_usuario" },
    });
    ItemSale.hasMany(Comentary, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_item" },
    });
    User.hasOne(Cart, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id" },
    });
    Cart.belongsTo(User, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
        foreignKey: { name: "id" },
    });
    Cart.hasMany(ItemCart, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_carrito" },
    });
    Product.hasMany(ItemCart, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { name: "id_producto" },
    });
};
