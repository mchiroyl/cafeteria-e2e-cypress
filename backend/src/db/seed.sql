TRUNCATE order_items, orders, products RESTART IDENTITY CASCADE;

INSERT INTO products (name, price, available, stock) VALUES
  ('Café Americano',    25.00, true,  10),
  ('Cappuccino',        30.00, true,  10),
  ('Sandwich de Pollo', 45.00, true,  10),
  ('Jugo de Naranja',   20.00, true,  10),
  ('Pastel de Chocolate',35.00, false, 0);
