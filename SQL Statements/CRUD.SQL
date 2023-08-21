-- Update info
UPDATE Bakery_Menu
SET price = 3.49
WHERE item_name = 'Scone';


-- Delete info
DELETE FROM Bakery_Menu
WHERE item_name = 'Croissant';

-- Select info
SELECT * FROM Bakery_Menu;

