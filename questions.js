const examSections = [
  {
    "title": "พื้นฐานฐานข้อมูลและคำสั่ง SQL",
    "intro": "บริษัทแห่งหนึ่งจัดเก็บข้อมูลพนักงานและแผนกไว้ในฐานข้อมูล ให้ใช้ตาราง employees และ departments ตามโครงสร้างต่อไปนี้",
    "schema": "employees(id INT PK, name VARCHAR(100), department_id INT, salary DECIMAL(10,2), hire_date DATE, status VARCHAR(20))\ndepartments(id INT PK, department_name VARCHAR(100))",
    "items": [
      [
        "Easy",
        "แสดงข้อมูลพนักงานทุกคน โดยให้แสดงเฉพาะคอลัมน์ name และ salary",
        "SELECT name, salary\nFROM employees;",
        "เลือกเฉพาะคอลัมน์ที่โจทย์ต้องการด้วย SELECT"
      ],
      [
        "Medium",
        "แสดงชื่อและเงินเดือนของพนักงานที่มีเงินเดือนตั้งแต่ 25,000 บาทขึ้นไป และเรียงเงินเดือนจากมากไปน้อย",
        "SELECT name, salary\nFROM employees\nWHERE salary >= 25000\nORDER BY salary DESC;",
        "ใช้ WHERE กรองข้อมูล และ ORDER BY DESC เรียงจากมากไปน้อย"
      ],
      [
        "Medium",
        "ค้นหาพนักงานที่อยู่แผนก 2 หรือ 3 และมีสถานะเป็น 'active'",
        "SELECT *\nFROM employees\nWHERE department_id IN (2, 3)\n  AND status = 'active';",
        "IN ใช้ตรวจสอบหลายค่าของฟิลด์เดียวกัน และ AND บังคับให้ผ่านทั้งสองเงื่อนไข"
      ],
      [
        "Hard",
        "ค้นหาพนักงานที่ชื่อขึ้นต้นด้วยตัวอักษร A หรือ B โดยไม่สนใจตัวพิมพ์เล็ก/ใหญ่ พร้อมแสดง 10 รายการแรก",
        "SELECT *\nFROM employees\nWHERE LOWER(name) LIKE 'a%'\n   OR LOWER(name) LIKE 'b%'\nLIMIT 10;",
        "LOWER ทำให้ตรวจสอบรูปแบบตัวพิมพ์ได้สม่ำเสมอ; LIMIT จำกัดจำนวนแถว"
      ],
      [
        "Advanced",
        "แสดงรายการเงินเดือนที่ไม่ซ้ำกัน เรียงจากมากไปน้อย และแสดงเฉพาะ 5 ระดับเงินเดือนแรก",
        "SELECT DISTINCT salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;",
        "DISTINCT ตัดค่าซ้ำ; ORDER BY และ LIMIT ใช้จัดลำดับและจำกัดผลลัพธ์"
      ]
    ]
  },
  {
    "title": "การจัดการข้อมูลด้วย SQL (DML)",
    "intro": "ฝ่ายบุคคลต้องเพิ่มและปรับปรุงข้อมูลพนักงานในตาราง employees โดยมีโครงสร้างดังนี้",
    "schema": "employees(id INT AUTO_INCREMENT PK, name VARCHAR(100), department_id INT, salary DECIMAL(10,2), status VARCHAR(20), updated_at DATETIME)",
    "items": [
      [
        "Easy",
        "เพิ่มพนักงานชื่อ 'Somchai' อยู่แผนก 1 เงินเดือน 28,000 บาท และสถานะ 'active' โดยไม่ระบุ id",
        "INSERT INTO employees (name, department_id, salary, status)\nVALUES ('Somchai', 1, 28000.00, 'active');",
        "ไม่ต้องระบุ id เพราะกำหนด AUTO_INCREMENT"
      ],
      [
        "Medium",
        "ปรับเงินเดือนพนักงาน id = 5 เป็น 32,500 บาท",
        "UPDATE employees\nSET salary = 32500.00\nWHERE id = 5;",
        "UPDATE ใช้ SET กำหนดค่าใหม่ และ WHERE จำกัดแถวที่ต้องการแก้ไข"
      ],
      [
        "Medium",
        "เปลี่ยนสถานะพนักงานทุกคนในแผนก 4 เป็น 'inactive'",
        "UPDATE employees\nSET status = 'inactive'\nWHERE department_id = 4;",
        "เงื่อนไข WHERE จะมีผลกับทุกแถวที่ตรงกับ department_id = 4"
      ],
      [
        "Hard",
        "ลบพนักงานที่มีสถานะ 'inactive' และไม่มีการปรับปรุงข้อมูลเกินวันที่ 1 มกราคม 2024",
        "DELETE FROM employees\nWHERE status = 'inactive'\n  AND updated_at < '2024-01-01';",
        "DELETE ลบข้อมูลถาวรตามเงื่อนไข ควร SELECT ตรวจสอบแถวก่อนลบ"
      ],
      [
        "Advanced",
        "เขียนชุดคำสั่งที่เริ่ม Transaction ปรับเงินเดือนพนักงาน id = 8 เพิ่มขึ้น 10% จากนั้นยกเลิกการเปลี่ยนแปลง",
        "START TRANSACTION;\nUPDATE employees\nSET salary = salary * 1.10\nWHERE id = 8;\nROLLBACK;",
        "ROLLBACK ยกเลิกการเปลี่ยนแปลงใน Transaction (ต้องใช้ Storage Engine ที่รองรับ เช่น InnoDB)"
      ]
    ]
  },
  {
    "title": "การเชื่อมโยงและวิเคราะห์ข้อมูล",
    "intro": "ระบบขายสินค้ามีข้อมูลลูกค้า คำสั่งซื้อ และรายการสินค้า โดยต้องวิเคราะห์ยอดขายจากหลายตาราง",
    "schema": "customers(id INT PK, customer_name VARCHAR(100))\norders(id INT PK, customer_id INT, order_date DATE, total_amount DECIMAL(10,2))\norder_items(id INT PK, order_id INT, product_id INT, quantity INT, unit_price DECIMAL(10,2))",
    "items": [
      [
        "Easy",
        "แสดงรหัสคำสั่งซื้อ วันที่สั่งซื้อ และชื่อลูกค้า โดยเชื่อม orders กับ customers",
        "SELECT o.id, o.order_date, c.customer_name\nFROM orders AS o\nINNER JOIN customers AS c ON c.id = o.customer_id;",
        "INNER JOIN คืนเฉพาะแถวที่จับคู่กันได้ตามเงื่อนไข ON"
      ],
      [
        "Medium",
        "แสดงลูกค้าทุกคนพร้อมจำนวนคำสั่งซื้อ หากไม่มีคำสั่งซื้อให้แสดงจำนวนเป็น 0",
        "SELECT c.id, c.customer_name,\n       COUNT(o.id) AS order_count\nFROM customers AS c\nLEFT JOIN orders AS o ON o.customer_id = c.id\nGROUP BY c.id, c.customer_name;",
        "LEFT JOIN เก็บลูกค้าทุกคนไว้ และ COUNT(o.id) ไม่นับ NULL"
      ],
      [
        "Medium",
        "คำนวณยอดขายรวมของแต่ละลูกค้า โดยแสดงเฉพาะลูกค้าที่มียอดซื้อรวมมากกว่า 50,000 บาท",
        "SELECT c.id, c.customer_name,\n       SUM(o.total_amount) AS total_sales\nFROM customers AS c\nINNER JOIN orders AS o ON o.customer_id = c.id\nGROUP BY c.id, c.customer_name\nHAVING SUM(o.total_amount) > 50000;",
        "GROUP BY รวมกลุ่มตามลูกค้า และ HAVING กรองผลหลังการรวมกลุ่ม"
      ],
      [
        "Hard",
        "ค้นหาลูกค้าที่ไม่เคยมีคำสั่งซื้อเลย",
        "SELECT c.id, c.customer_name\nFROM customers AS c\nLEFT JOIN orders AS o ON o.customer_id = c.id\nWHERE o.id IS NULL;",
        "LEFT JOIN แล้วตรวจ o.id IS NULL เพื่อหาลูกค้าที่ไม่มีรายการจับคู่"
      ],
      [
        "Advanced",
        "แสดงสินค้าที่มียอดจำนวนขายรวมมากกว่าค่าเฉลี่ยจำนวนขายต่อรายการของทุกรายการใน order_items (สมมติว่ามีตาราง products(id, product_name))",
        "SELECT p.id, p.product_name,\n       SUM(oi.quantity) AS total_quantity\nFROM products AS p\nJOIN order_items AS oi ON oi.product_id = p.id\nGROUP BY p.id, p.product_name\nHAVING SUM(oi.quantity) > (\n    SELECT AVG(quantity) FROM order_items\n);",
        "Subquery คำนวณค่าเฉลี่ยก่อน แล้ว HAVING เปรียบเทียบยอดรวมของสินค้าแต่ละรายการ"
      ]
    ]
  },
  {
    "title": "การออกแบบและบริหารจัดการฐานข้อมูล",
    "intro": "ให้ออกแบบตารางสำหรับระบบลงทะเบียนอบรม โดยผู้เข้าอบรมหนึ่งคนสามารถลงทะเบียนได้หลายหลักสูตร และหนึ่งหลักสูตรมีผู้เข้าอบรมได้หลายคน",
    "schema": "กำหนดให้มีตาราง participants และ courses เชื่อมกันแบบ many-to-many ผ่านตาราง registrations",
    "items": [
      [
        "Easy",
        "สร้างฐานข้อมูลชื่อ training_db โดยกำหนด character set เป็น utf8mb4",
        "CREATE DATABASE training_db\nCHARACTER SET utf8mb4\nCOLLATE utf8mb4_unicode_ci;",
        "CREATE DATABASE ใช้สร้างฐานข้อมูล และ utf8mb4 รองรับอักขระภาษาไทย"
      ],
      [
        "Medium",
        "สร้างตาราง participants ให้มี id เป็น Primary Key แบบ Auto Increment และ name ห้ามเป็นค่าว่าง",
        "CREATE TABLE participants (\n    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(150) NOT NULL\n) ENGINE=InnoDB;",
        "กำหนด Primary Key, AUTO_INCREMENT และ NOT NULL"
      ],
      [
        "Medium",
        "เพิ่มคอลัมน์ email ใน participants โดยต้องไม่ซ้ำกัน",
        "ALTER TABLE participants\nADD COLUMN email VARCHAR(255) NOT NULL,\nADD CONSTRAINT uq_participants_email UNIQUE (email);",
        "ALTER TABLE เพิ่มคอลัมน์และ UNIQUE constraint; ในระบบจริงควรพิจารณาข้อมูลเดิมก่อนกำหนด NOT NULL"
      ],
      [
        "Hard",
        "สร้างตาราง registrations ให้มี participant_id, course_id และ registered_at โดยกำหนด Foreign Key ไปยัง participants และ courses และห้ามลงทะเบียนซ้ำหลักสูตรเดิม",
        "CREATE TABLE registrations (\n    participant_id BIGINT UNSIGNED NOT NULL,\n    course_id BIGINT UNSIGNED NOT NULL,\n    registered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (participant_id, course_id),\n    FOREIGN KEY (participant_id) REFERENCES participants(id),\n    FOREIGN KEY (course_id) REFERENCES courses(id)\n) ENGINE=InnoDB;",
        "Composite Primary Key ป้องกันการลงทะเบียนซ้ำของคู่ participant_id และ course_id; ต้องสร้าง courses ด้วยชนิด id ที่ตรงกันก่อน"
      ],
      [
        "Advanced",
        "อธิบายว่าทำไมไม่ควรเก็บชื่อหลักสูตรหลายรายการไว้ในคอลัมน์เดียวของ participants และเสนอรูปแบบความสัมพันธ์ที่เหมาะสม",
        "คำตอบ: ไม่ควรเก็บหลายค่าในคอลัมน์เดียว เพราะขัดกับหลัก 1NF ทำให้ค้นหา แก้ไข และบังคับความถูกต้องของข้อมูลยาก ควรแยก courses และ registrations โดยใช้ Foreign Key เชื่อม participants กับ courses แบบ Many-to-Many",
        "ใช้หลัก Normalization โดยเฉพาะ 1NF และ associative/junction table เพื่อแยกข้อมูลตามหน้าที่"
      ]
    ]
  },
  {
    "title": "SQL ขั้นประยุกต์และการแก้ไขปัญหา",
    "intro": "ฐานข้อมูลระบบคลังสินค้ามีตาราง products และ stock_movements ใช้ติดตามสินค้าและการเคลื่อนไหวของสต็อก",
    "schema": "products(id INT PK, product_name VARCHAR(150), price DECIMAL(10,2), stock INT, created_at DATETIME)\nstock_movements(id INT PK, product_id INT, movement_type VARCHAR(10), quantity INT, created_at DATETIME)",
    "items": [
      [
        "Easy",
        "แสดงชื่อสินค้าและระดับราคา โดยให้สินค้าที่ราคาตั้งแต่ 1,000 บาทเป็น 'Premium' นอกนั้นเป็น 'Standard'",
        "SELECT product_name, price,\n       CASE WHEN price >= 1000 THEN 'Premium'\n            ELSE 'Standard' END AS price_level\nFROM products;",
        "CASE WHEN ใช้กำหนดเงื่อนไขและคืนค่าตามกรณี"
      ],
      [
        "Medium",
        "แสดงชื่อสินค้าและจำนวนสต็อก หาก stock เป็น NULL ให้แสดง 0",
        "SELECT product_name, COALESCE(stock, 0) AS stock\nFROM products;",
        "COALESCE คืนค่าแรกที่ไม่ใช่ NULL; ในโจทย์นี้ใช้แทน NULL ด้วย 0"
      ],
      [
        "Medium",
        "แสดงยอดรับเข้าและยอดจ่ายออกของสินค้าแต่ละรายการ โดย movement_type มีค่า 'IN' และ 'OUT'",
        "SELECT product_id,\n       SUM(CASE WHEN movement_type = 'IN' THEN quantity ELSE 0 END) AS total_in,\n       SUM(CASE WHEN movement_type = 'OUT' THEN quantity ELSE 0 END) AS total_out\nFROM stock_movements\nGROUP BY product_id;",
        "Conditional Aggregation ใช้ CASE ภายใน SUM เพื่อแยกยอดตามประเภท"
      ],
      [
        "Hard",
        "แสดงจำนวนสินค้าที่เพิ่มเข้าระบบในแต่ละเดือนของปี 2025 โดยเรียงตามเดือน",
        "SELECT DATE_FORMAT(created_at, '%Y-%m') AS month,\n       COUNT(*) AS product_count\nFROM products\nWHERE created_at >= '2025-01-01'\n  AND created_at < '2026-01-01'\nGROUP BY DATE_FORMAT(created_at, '%Y-%m')\nORDER BY month;",
        "ใช้ช่วงวันที่แบบต้นรวมปลายไม่รวม ช่วยหลีกเลี่ยงปัญหาเวลาที่มีส่วนเวลา และ GROUP BY เดือน"
      ],
      [
        "Advanced",
        "ตาราง products มีข้อมูลจำนวนมากและคำสั่งค้นหาสินค้าตาม product_name ใช้เวลานาน ควรปรับปรุงอย่างไร พร้อมเขียนคำสั่งสร้าง Index",
        "CREATE INDEX idx_products_product_name\nON products (product_name);\n\n-- ตรวจสอบแผนการทำงานของ Query\nEXPLAIN\nSELECT * FROM products\nWHERE product_name = 'Keyboard';",
        "สร้าง Index บนคอลัมน์ที่ใช้ค้นหาบ่อย และใช้ EXPLAIN ตรวจแผน Query; Index เพิ่มภาระการเขียนข้อมูลและใช้พื้นที่ จึงควรเลือกอย่างเหมาะสม"
      ]
    ]
  }
];
