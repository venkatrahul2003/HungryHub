-- Clear existing menu items if any
DELETE FROM menu_items;

-- Insert premium menu items
INSERT INTO menu_items (name, price, category, description, rating, image_url) VALUES 
('Tandoori Butter Chicken', 349, 'Main Course', 'Succulent chicken pieces cooked in a creamy tomato gravy with butter and traditional spices.', 4.9, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=500'),
('Double Cheese Paneer Pizza', 299, 'Fast Food', 'Freshly baked hand-tossed crust topped with spiced paneer, mozarella, and secret pizza sauce.', 4.7, 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=500'),
('Authentic Hyderabadi Biryani', 259, 'Main Course', 'Fragrant long-grain basmati rice cooked with marinated chicken and exotic spices on dum.', 4.8, 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=500'),
('Belgian Chocolate Waffle', 189, 'Dessert', 'Crispy and fluffy waffle served with warm Belgian chocolate, whipped cream and sprinkles.', 4.9, 'https://images.unsplash.com/photo-158582231db53-bc23f95e8f46?auto=format&fit=crop&q=80&w=500'),
('Quinoa Avocado Salad', 249, 'Healthy', 'Nutritious mix of white quinoa, fresh avocados, cherry tomatoes, and honey-lemon dressing.', 4.5, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500'),
('Mango Mastani Shake', 149, 'Beverages', 'Thick and creamy mango shake topped with vanilla ice cream, dry fruits, and cherry.', 4.6, 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&q=80&w=500'),
('Classic Chicken Burger', 179, 'Fast Food', 'Juicy grilled chicken patty with fresh lettuce, onions, cheese slice and mayo.', 4.4, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500'),
('Assorted Sushi Platter', 499, 'Main Course', 'Freshly prepared California rolls, tempura prawns and salmon nigiri served with soy.', 4.8, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=500'),
('Red Velvet Lava Cake', 159, 'Dessert', 'Warm and gooey red velvet cake with a molten chocolate center.', 4.7, 'https://images.unsplash.com/photo-1624353335563-0949d0340794?auto=format&fit=crop&q=80&w=500'),
('Iced Peach Tea', 119, 'Beverages', 'Refreshing brew of premium tea leaves with a twist of sweet peach and lemon.', 4.3, 'https://images.unsplash.com/photo-1556679343-c73db62d597c?auto=format&fit=crop&q=80&w=500');
