
/*
|--------------------------------------------------------------------------
| MYSQL SQL PRACTICE EXAM - QUESTION BANK
|--------------------------------------------------------------------------
| MySQL 8.0+
| รูปแบบ: 55 ข้อใหญ่ x 5 ข้อย่อย
| การสอบแต่ละรอบ: สุ่ม 5 ข้อใหญ่ x 5 ข้อย่อย = 25 ข้อ
| คะแนน: 4 คะแนนต่อข้อ รวม 100 คะแนน
|
| type:
| query  = ตรวจผลลัพธ์ SQL
| manual = ตรวจคำตอบตามเกณฑ์ที่กำหนด
|
| หมายเหตุ:
| คลังข้อสอบปัจจุบัน: 25 ข้อใหญ่ x 5 ข้อย่อย = 125 ข้อย่อย
| เป้าหมาย: 55 ข้อใหญ่ x 5 ข้อย่อย = 275 ข้อย่อย
|--------------------------------------------------------------------------
*/

window.QUESTION_BANK = [
  // ============================================================
  // ข้อใหญ่ 1 : พื้นฐาน SQL
  // ============================================================
  {
    id: 1,
    title: "พื้นฐานการเรียกดูข้อมูลด้วย SQL",
    category: "SQL Basic",
    difficulty: "Easy - Advanced",
    schema: `
employees(
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    salary DECIMAL(10,2),
    status VARCHAR(20)
)

departments(
    id INT PRIMARY KEY,
    department_name VARCHAR(100)
)`,
    questions: [
      {
        id: "1-1",
        type: "query",
        prompt: "แสดงข้อมูลพนักงานทุกคน โดยแสดงเฉพาะชื่อและเงินเดือน",
        answer: "SELECT name, salary FROM employees;",
        expectedSql: "SELECT name, salary FROM employees;",
        explanation: "ใช้ SELECT ระบุคอลัมน์ที่ต้องการ และ FROM ระบุตาราง",
        keywords: ["SELECT", "name", "salary", "FROM", "employees"],
      },
      {
        id: "1-2",
        type: "query",
        prompt:
          "แสดงพนักงานที่มีเงินเดือนตั้งแต่ 25,000 บาทขึ้นไป เรียงจากเงินเดือนมากไปน้อย",
        answer:
          "SELECT * FROM employees WHERE salary >= 25000 ORDER BY salary DESC;",
        expectedSql:
          "SELECT * FROM employees WHERE salary >= 25000 ORDER BY salary DESC;",
        explanation:
          "WHERE ใช้กรองข้อมูล และ ORDER BY DESC ใช้เรียงจากมากไปน้อย",
        keywords: ["SELECT", "FROM", "WHERE", "salary", "ORDER BY", "DESC"],
      },
      {
        id: "1-3",
        type: "query",
        prompt: "ค้นหาพนักงานที่อยู่แผนก 1 หรือแผนก 2 และมีสถานะ active",
        answer:
          "SELECT * FROM employees WHERE department_id IN (1, 2) AND status = 'active';",
        expectedSql:
          "SELECT * FROM employees WHERE department_id IN (1, 2) AND status = 'active';",
        explanation:
          "IN ใช้ตรวจสอบหลายค่า และ AND ใช้กำหนดเงื่อนไขที่ต้องเป็นจริงพร้อมกัน",
        keywords: ["SELECT", "FROM", "WHERE", "IN", "AND", "active"],
      },
      {
        id: "1-4",
        type: "query",
        prompt: "ค้นหาพนักงานที่ชื่อขึ้นต้นด้วยตัวอักษร A",
        answer: "SELECT * FROM employees WHERE name LIKE 'A%';",
        expectedSql: "SELECT * FROM employees WHERE name LIKE 'A%';",
        explanation:
          "LIKE ใช้ค้นหาข้อมูลตามรูปแบบ โดย % หมายถึงอักขระจำนวนเท่าใดก็ได้",
        keywords: ["SELECT", "FROM", "WHERE", "LIKE"],
      },
      {
        id: "1-5",
        type: "query",
        prompt:
          "แสดงเงินเดือนที่ไม่ซ้ำกัน เรียงจากมากไปน้อย และแสดงเพียง 5 รายการ",
        answer:
          "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 5;",
        expectedSql:
          "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 5;",
        explanation:
          "DISTINCT ตัดค่าซ้ำ ORDER BY เรียงลำดับ และ LIMIT จำกัดจำนวนแถว",
        keywords: ["SELECT", "DISTINCT", "salary", "ORDER BY", "DESC", "LIMIT"],
      },
    ],
  },

  // ============================================================
  // ข้อใหญ่ 2 : การจัดการข้อมูล DML
  // ============================================================
  {
    id: 2,
    title: "การเพิ่ม แก้ไข และลบข้อมูล (DML)",
    category: "Data Manipulation",
    difficulty: "Easy - Advanced",
    schema: `
employees(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    salary DECIMAL(10,2),
    status VARCHAR(20)
)`,
    questions: [
      {
        id: "2-1",
        type: "manual",
        prompt:
          "เขียนคำสั่งเพิ่มพนักงานชื่อ Somchai อยู่แผนก 1 เงินเดือน 28,000 บาท และสถานะ active",
        answer:
          "INSERT INTO employees (name, department_id, salary, status) VALUES ('Somchai', 1, 28000, 'active');",
        explanation:
          "ใช้ INSERT INTO เพื่อเพิ่มข้อมูล และระบุคอลัมน์ให้ตรงกับค่าที่ต้องการบันทึก",
        keywords: [
          "INSERT INTO",
          "employees",
          "name",
          "department_id",
          "salary",
          "VALUES",
        ],
      },
      {
        id: "2-2",
        type: "manual",
        prompt: "เขียนคำสั่งปรับเงินเดือนพนักงาน id = 5 เป็น 32,500 บาท",
        answer: "UPDATE employees SET salary = 32500 WHERE id = 5;",
        explanation:
          "UPDATE ใช้แก้ไขข้อมูล SET กำหนดค่าใหม่ และ WHERE ระบุแถวที่ต้องการแก้ไข",
        keywords: ["UPDATE", "employees", "SET", "salary", "WHERE", "id"],
      },
      {
        id: "2-3",
        type: "manual",
        prompt: "เปลี่ยนสถานะพนักงานทุกคนในแผนก 4 ให้เป็น inactive",
        answer:
          "UPDATE employees SET status = 'inactive' WHERE department_id = 4;",
        explanation: "UPDATE สามารถแก้ไขหลายแถวได้หากตรงกับเงื่อนไข WHERE",
        keywords: ["UPDATE", "SET", "status", "WHERE", "department_id"],
      },
      {
        id: "2-4",
        type: "manual",
        prompt: "ลบพนักงานที่มีสถานะ inactive ออกจากระบบ",
        answer: "DELETE FROM employees WHERE status = 'inactive';",
        explanation:
          "DELETE ใช้ลบข้อมูล ควรตรวจสอบด้วย SELECT ก่อนดำเนินการจริง",
        keywords: ["DELETE FROM", "employees", "WHERE", "status"],
      },
      {
        id: "2-5",
        type: "manual",
        prompt:
          "เขียนคำสั่ง Transaction เพื่อเพิ่มเงินเดือนพนักงาน id = 8 อีก 10% และยกเลิกการเปลี่ยนแปลง",
        answer:
          "START TRANSACTION; UPDATE employees SET salary = salary * 1.10 WHERE id = 8; ROLLBACK;",
        explanation:
          "START TRANSACTION เริ่มธุรกรรม และ ROLLBACK ยกเลิกการเปลี่ยนแปลงที่ยังไม่ COMMIT",
        keywords: ["START TRANSACTION", "UPDATE", "SET", "ROLLBACK"],
      },
    ],
  },

  // ============================================================
  // ข้อใหญ่ 3 : JOIN และการวิเคราะห์ข้อมูล
  // ============================================================
  {
    id: 3,
    title: "การเชื่อมโยงตารางและการวิเคราะห์ข้อมูล",
    category: "JOIN & Aggregate",
    difficulty: "Easy - Advanced",
    schema: `
customers(
    id INT PRIMARY KEY,
    customer_name VARCHAR(100)
)

orders(
    id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10,2)
)

products(
    id INT PRIMARY KEY,
    product_name VARCHAR(100)
)

order_items(
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10,2)
)`,
    questions: [
      {
        id: "3-1",
        type: "query",
        prompt:
          "แสดงรหัสคำสั่งซื้อและชื่อลูกค้า โดยเชื่อมตาราง orders กับ customers",
        answer:
          "SELECT o.id, c.customer_name FROM orders o INNER JOIN customers c ON o.customer_id = c.id;",
        expectedSql:
          "SELECT o.id, c.customer_name FROM orders o INNER JOIN customers c ON o.customer_id = c.id;",
        explanation: "INNER JOIN เชื่อมข้อมูลเฉพาะแถวที่มีความสัมพันธ์กัน",
        keywords: ["SELECT", "JOIN", "ON", "customer_id"],
      },
      {
        id: "3-2",
        type: "query",
        prompt:
          "แสดงรายชื่อลูกค้าทุกคนพร้อมจำนวนคำสั่งซื้อ หากไม่มีคำสั่งซื้อให้แสดง 0",
        answer:
          "SELECT c.id, c.customer_name, COUNT(o.id) AS order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.customer_name;",
        expectedSql:
          "SELECT c.id, c.customer_name, COUNT(o.id) AS order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.customer_name;",
        explanation:
          "LEFT JOIN เก็บข้อมูลลูกค้าทุกคนไว้ และ COUNT(o.id) ไม่นับค่า NULL",
        keywords: ["LEFT JOIN", "COUNT", "GROUP BY"],
      },
      {
        id: "3-3",
        type: "query",
        prompt:
          "หายอดขายรวมของลูกค้าแต่ละคน โดยแสดงเฉพาะลูกค้าที่มียอดซื้อเกิน 50,000 บาท",
        answer:
          "SELECT c.id, c.customer_name, SUM(o.total_amount) AS total_sales FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.customer_name HAVING SUM(o.total_amount) > 50000;",
        expectedSql:
          "SELECT c.id, c.customer_name, SUM(o.total_amount) AS total_sales FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.customer_name HAVING SUM(o.total_amount) > 50000;",
        explanation:
          "GROUP BY รวมกลุ่มข้อมูล ส่วน HAVING ใช้กรองผลลัพธ์หลังการรวมกลุ่ม",
        keywords: ["JOIN", "SUM", "GROUP BY", "HAVING"],
      },
      {
        id: "3-4",
        type: "query",
        prompt: "ค้นหาลูกค้าที่ไม่เคยมีคำสั่งซื้อ",
        answer:
          "SELECT c.id, c.customer_name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
        expectedSql:
          "SELECT c.id, c.customer_name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
        explanation:
          "LEFT JOIN ร่วมกับ IS NULL ใช้ค้นหาแถวที่ไม่มีข้อมูลจับคู่ในอีกตาราง",
        keywords: ["LEFT JOIN", "IS NULL", "WHERE"],
      },
      {
        id: "3-5",
        type: "manual",
        prompt:
          "เขียน Subquery เพื่อค้นหาสินค้าที่มีราคาสูงกว่าราคาเฉลี่ยของสินค้าทั้งหมด โดยสมมติว่าตาราง products มีคอลัมน์ price",
        answer:
          "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);",
        explanation:
          "Subquery คำนวณราคาเฉลี่ยก่อน แล้ว Query ชั้นนอกเลือกสินค้าที่มีราคาสูงกว่าค่าเฉลี่ย",
        keywords: ["SELECT", "WHERE", "AVG", "SUBQUERY"],
      },
    ],
  },

  // ============================================================
  // ข้อใหญ่ 4 : การออกแบบฐานข้อมูล
  // ============================================================
  {
    id: 4,
    title: "การออกแบบและบริหารจัดการฐานข้อมูล",
    category: "Database Design",
    difficulty: "Easy - Advanced",
    schema: `
participants(
    id BIGINT UNSIGNED PRIMARY KEY,
    name VARCHAR(150),
    email VARCHAR(255)
)

courses(
    id BIGINT UNSIGNED PRIMARY KEY,
    course_name VARCHAR(150)
)

registrations(
    participant_id BIGINT UNSIGNED,
    course_id BIGINT UNSIGNED,
    registered_at DATETIME
)`,
    questions: [
      {
        id: "4-1",
        type: "manual",
        prompt:
          "เขียนคำสั่งสร้างฐานข้อมูลชื่อ training_db โดยกำหนด Character Set เป็น utf8mb4",
        answer:
          "CREATE DATABASE training_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;",
        explanation:
          "CREATE DATABASE ใช้สร้างฐานข้อมูล และ utf8mb4 รองรับอักขระภาษาไทย",
        keywords: [
          "CREATE DATABASE",
          "training_db",
          "CHARACTER SET",
          "utf8mb4",
        ],
      },
      {
        id: "4-2",
        type: "manual",
        prompt:
          "สร้างตาราง participants โดยมี id เป็น BIGINT AUTO_INCREMENT PRIMARY KEY และ name ห้ามเป็น NULL",
        answer:
          "CREATE TABLE participants (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(150) NOT NULL) ENGINE=InnoDB;",
        explanation:
          "PRIMARY KEY กำหนดคีย์หลัก AUTO_INCREMENT เพิ่มค่าอัตโนมัติ และ NOT NULL ห้ามค่าว่าง",
        keywords: ["CREATE TABLE", "AUTO_INCREMENT", "PRIMARY KEY", "NOT NULL"],
      },
      {
        id: "4-3",
        type: "manual",
        prompt:
          "เพิ่มคอลัมน์ email ให้ตาราง participants และกำหนดให้ข้อมูล email ไม่ซ้ำกัน",
        answer:
          "ALTER TABLE participants ADD COLUMN email VARCHAR(255) UNIQUE;",
        explanation:
          "ALTER TABLE ใช้ปรับโครงสร้างตาราง และ UNIQUE ป้องกันค่าซ้ำ",
        keywords: ["ALTER TABLE", "ADD COLUMN", "email", "UNIQUE"],
      },
      {
        id: "4-4",
        type: "manual",
        prompt:
          "สร้างตาราง registrations โดยใช้ participant_id และ course_id เป็น Composite Primary Key พร้อม Foreign Key เชื่อมกับตารางที่เกี่ยวข้อง",
        answer:
          "CREATE TABLE registrations (participant_id BIGINT UNSIGNED NOT NULL, course_id BIGINT UNSIGNED NOT NULL, registered_at DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (participant_id, course_id), FOREIGN KEY (participant_id) REFERENCES participants(id), FOREIGN KEY (course_id) REFERENCES courses(id)) ENGINE=InnoDB;",
        explanation:
          "Composite Primary Key ป้องกันการลงทะเบียนซ้ำ และ Foreign Key รักษาความสัมพันธ์ระหว่างตาราง",
        keywords: ["CREATE TABLE", "PRIMARY KEY", "FOREIGN KEY", "REFERENCES"],
      },
      {
        id: "4-5",
        type: "manual",
        prompt:
          "อธิบายเหตุผลที่ควรแยกข้อมูลหลักสูตรออกจากข้อมูลผู้เข้าอบรม และใช้ตารางกลาง registrations",
        answer:
          "ควรแยกตารางตามหลัก Normalization โดยใช้ registrations เป็น Junction Table เชื่อมความสัมพันธ์ Many-to-Many",
        explanation:
          "ช่วยลดข้อมูลซ้ำ ลดปัญหาการแก้ไขข้อมูล และรักษาความถูกต้องของความสัมพันธ์",
        keywords: ["NORMALIZATION", "MANY-TO-MANY", "JUNCTION TABLE"],
      },
    ],
  },

  // ============================================================
  // ข้อใหญ่ 5 : SQL ขั้นประยุกต์
  // ============================================================
  {
    id: 5,
    title: "SQL ขั้นประยุกต์และการแก้ไขปัญหา",
    category: "Advanced SQL",
    difficulty: "Easy - Advanced",
    schema: `
products(
    id INT PRIMARY KEY,
    product_name VARCHAR(150),
    price DECIMAL(10,2),
    stock INT,
    created_at DATETIME
)

stock_movements(
    id INT PRIMARY KEY,
    product_id INT,
    movement_type VARCHAR(10),
    quantity INT,
    created_at DATETIME
)`,
    questions: [
      {
        id: "5-1",
        type: "query",
        prompt:
          "แสดงชื่อสินค้าและระดับราคา โดยสินค้าที่มีราคาตั้งแต่ 1,000 บาทขึ้นไปให้เป็น Premium นอกนั้นเป็น Standard",
        answer:
          "SELECT product_name, CASE WHEN price >= 1000 THEN 'Premium' ELSE 'Standard' END AS price_level FROM products;",
        expectedSql:
          "SELECT product_name, CASE WHEN price >= 1000 THEN 'Premium' ELSE 'Standard' END AS price_level FROM products;",
        explanation: "CASE WHEN ใช้สร้างเงื่อนไขและคืนค่าตามกรณีที่กำหนด",
        keywords: ["SELECT", "CASE", "WHEN", "THEN", "ELSE", "END"],
      },
      {
        id: "5-2",
        type: "query",
        prompt: "แสดงชื่อสินค้าและจำนวนสต็อก หาก stock เป็น NULL ให้แสดง 0",
        answer:
          "SELECT product_name, COALESCE(stock, 0) AS stock FROM products;",
        expectedSql:
          "SELECT product_name, COALESCE(stock, 0) AS stock FROM products;",
        explanation: "COALESCE คืนค่าแรกที่ไม่ใช่ NULL",
        keywords: ["SELECT", "COALESCE", "FROM"],
      },
      {
        id: "5-3",
        type: "query",
        prompt:
          "แสดงยอดรับเข้าและยอดจ่ายออกของสินค้าแต่ละรายการ โดย movement_type มีค่า IN และ OUT",
        answer:
          "SELECT product_id, SUM(CASE WHEN movement_type = 'IN' THEN quantity ELSE 0 END) AS total_in, SUM(CASE WHEN movement_type = 'OUT' THEN quantity ELSE 0 END) AS total_out FROM stock_movements GROUP BY product_id;",
        expectedSql:
          "SELECT product_id, SUM(CASE WHEN movement_type = 'IN' THEN quantity ELSE 0 END) AS total_in, SUM(CASE WHEN movement_type = 'OUT' THEN quantity ELSE 0 END) AS total_out FROM stock_movements GROUP BY product_id;",
        explanation:
          "Conditional Aggregation ใช้ CASE ภายใน SUM เพื่อแยกยอดตามประเภท",
        keywords: ["SUM", "CASE", "WHEN", "GROUP BY"],
      },
      {
        id: "5-4",
        type: "query",
        prompt: "นับจำนวนสินค้าที่เพิ่มเข้าระบบในแต่ละเดือนของปี 2025",
        answer:
          "SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS product_count FROM products WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01' GROUP BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY month;",
        expectedSql:
          "SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS product_count FROM products WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01' GROUP BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY month;",
        explanation:
          "DATE_FORMAT จัดกลุ่มตามเดือน และใช้ช่วงวันที่แบบต้นรวมปลายไม่รวม",
        keywords: ["DATE_FORMAT", "COUNT", "GROUP BY", "ORDER BY"],
      },
      {
        id: "5-5",
        type: "manual",
        prompt:
          "เขียนคำสั่งสร้าง Index บนคอลัมน์ product_name ของตาราง products เพื่อช่วยเพิ่มประสิทธิภาพการค้นหา",
        answer:
          "CREATE INDEX idx_products_product_name ON products (product_name);",
        explanation:
          "Index ช่วยลดเวลาค้นหาบางรูปแบบ แต่ใช้พื้นที่และเพิ่มภาระในการ INSERT, UPDATE และ DELETE",
        keywords: ["CREATE INDEX", "ON", "products", "product_name"],
      },
      ],
    },
    {
        id: 6,
        title: "การกรองข้อมูลด้วย WHERE และ Comparison Operators",
        category: "SQL Basic",
        difficulty: "Easy - Advanced",
        schema:
          "employees(id INT, name VARCHAR(100), age INT, salary DECIMAL(10,2))",
        questions: [
          {
            id: "6-1",
            type: "manual",
            prompt: "แสดงพนักงานที่มีอายุมากกว่า 30 ปี",
            answer: "SELECT * FROM employees WHERE age > 30;",
            explanation: "ใช้เครื่องหมาย > เพื่อเปรียบเทียบค่าที่มากกว่า",
            keywords: ["SELECT", "FROM", "WHERE", "age", ">"],
          },
          {
            id: "6-2",
            type: "manual",
            prompt:
              "แสดงพนักงานที่มีเงินเดือนระหว่าง 20000 ถึง 40000 บาท รวมค่าขอบเขต",
            answer:
              "SELECT * FROM employees WHERE salary BETWEEN 20000 AND 40000;",
            explanation:
              "BETWEEN ใช้ค้นหาค่าที่อยู่ในช่วงและรวมค่าขอบเขตทั้งสองด้าน",
            keywords: ["SELECT", "WHERE", "BETWEEN", "salary"],
          },
          {
            id: "6-3",
            type: "manual",
            prompt: "ค้นหาพนักงานที่มีอายุไม่เท่ากับ 25 ปี",
            answer: "SELECT * FROM employees WHERE age <> 25;",
            explanation:
              "<> หมายถึงไม่เท่ากับ ใน MySQL สามารถใช้ != ได้เช่นกัน",
            keywords: ["SELECT", "WHERE", "age", "<>"],
          },
          {
            id: "6-4",
            type: "manual",
            prompt:
              "ค้นหาพนักงานที่มีเงินเดือนมากกว่า 30000 บาท และอายุต่ำกว่า 40 ปี",
            answer:
              "SELECT * FROM employees WHERE salary > 30000 AND age < 40;",
            explanation: "AND กำหนดให้ทั้งสองเงื่อนไขต้องเป็นจริง",
            keywords: ["SELECT", "WHERE", "AND", "salary", "age"],
          },
          {
            id: "6-5",
            type: "manual",
            prompt:
              "ค้นหาพนักงานที่มีเงินเดือนมากกว่า 50000 บาท หรือมีอายุมากกว่า 50 ปี",
            answer: "SELECT * FROM employees WHERE salary > 50000 OR age > 50;",
            explanation: "OR กำหนดให้มีเงื่อนไขอย่างน้อยหนึ่งข้อเป็นจริง",
            keywords: ["SELECT", "WHERE", "OR", "salary", "age"],
          },
        ],
      },
      {
        id: 7,
        title: "การเรียงลำดับและจำกัดผลลัพธ์",
        category: "SQL Basic",
        difficulty: "Easy - Advanced",
        schema:
          "products(id INT, product_name VARCHAR(100), price DECIMAL(10,2), stock INT)",
        questions: [
          {
            id: "7-1",
            type: "manual",
            prompt: "แสดงสินค้าทั้งหมดเรียงตามราคาจากน้อยไปมาก",
            answer: "SELECT * FROM products ORDER BY price ASC;",
            explanation: "ASC เรียงข้อมูลจากน้อยไปมาก",
            keywords: ["SELECT", "FROM", "ORDER BY", "price", "ASC"],
          },
          {
            id: "7-2",
            type: "manual",
            prompt: "แสดงสินค้า 10 รายการแรกที่มีราคาสูงที่สุด",
            answer: "SELECT * FROM products ORDER BY price DESC LIMIT 10;",
            explanation: "DESC เรียงจากมากไปน้อย และ LIMIT จำกัดจำนวนแถว",
            keywords: ["SELECT", "ORDER BY", "DESC", "LIMIT"],
          },
          {
            id: "7-3",
            type: "manual",
            prompt:
              "แสดงสินค้าเรียงตามจำนวนคงเหลือจากมากไปน้อย และหากเท่ากันให้เรียงตามชื่อสินค้า",
            answer:
              "SELECT * FROM products ORDER BY stock DESC, product_name ASC;",
            explanation: "สามารถกำหนด ORDER BY ได้หลายคอลัมน์ตามลำดับความสำคัญ",
            keywords: ["SELECT", "ORDER BY", "stock", "DESC", "product_name"],
          },
          {
            id: "7-4",
            type: "manual",
            prompt:
              "แสดงสินค้ารายการที่ 11 ถึง 20 เมื่อเรียงตามรหัสสินค้าจากน้อยไปมาก",
            answer:
              "SELECT * FROM products ORDER BY id ASC LIMIT 10 OFFSET 10;",
            explanation:
              "OFFSET 10 ข้าม 10 แถวแรก และ LIMIT 10 แสดง 10 แถวถัดไป",
            keywords: ["SELECT", "ORDER BY", "LIMIT", "OFFSET"],
          },
          {
            id: "7-5",
            type: "manual",
            prompt: "แสดงราคาสินค้าที่ไม่ซ้ำกัน โดยเรียงจากมากไปน้อย",
            answer: "SELECT DISTINCT price FROM products ORDER BY price DESC;",
            explanation: "DISTINCT ตัดค่าที่ซ้ำกันออกจากผลลัพธ์",
            keywords: ["SELECT", "DISTINCT", "price", "ORDER BY", "DESC"],
          },
        ],
      },
      {
        id: 8,
        title: "การค้นหาข้อมูลด้วย LIKE และ Pattern Matching",
        category: "SQL Basic",
        difficulty: "Easy - Advanced",
        schema:
          "customers(id INT, customer_name VARCHAR(100), email VARCHAR(150), phone VARCHAR(20))",
        questions: [
          {
            id: "8-1",
            type: "manual",
            prompt: "ค้นหาลูกค้าที่มีชื่อขึ้นต้นด้วยคำว่า Som",
            answer: "SELECT * FROM customers WHERE customer_name LIKE 'Som%';",
            explanation: "% หมายถึงอักขระจำนวนเท่าใดก็ได้หลังคำว่า Som",
            keywords: ["SELECT", "WHERE", "LIKE", "Som%"],
          },
          {
            id: "8-2",
            type: "manual",
            prompt: "ค้นหาลูกค้าที่มีอีเมลลงท้ายด้วย gmail.com",
            answer: "SELECT * FROM customers WHERE email LIKE '%gmail.com';",
            explanation: "% ด้านหน้าหมายถึงมีข้อความใดก็ได้ก่อน gmail.com",
            keywords: ["SELECT", "WHERE", "LIKE", "gmail.com"],
          },
          {
            id: "8-3",
            type: "manual",
            prompt: "ค้นหาลูกค้าที่มีตัวอักษรคำว่า admin อยู่ในอีเมล",
            answer: "SELECT * FROM customers WHERE email LIKE '%admin%';",
            explanation:
              "ใช้ % ทั้งสองด้านเพื่อค้นหาข้อความที่อยู่ตำแหน่งใดก็ได้",
            keywords: ["SELECT", "WHERE", "LIKE", "admin"],
          },
          {
            id: "8-4",
            type: "manual",
            prompt: "ค้นหาลูกค้าที่มีชื่อเป็นตัวอักษร 4 ตัวพอดี",
            answer: "SELECT * FROM customers WHERE customer_name LIKE '____';",
            explanation:
              "เครื่องหมาย _ แทนอักขระหนึ่งตัว ดังนั้น 4 ขีดล่างหมายถึง 4 ตัวอักษร",
            keywords: ["SELECT", "WHERE", "LIKE", "customer_name"],
          },
          {
            id: "8-5",
            type: "manual",
            prompt: "ค้นหาลูกค้าที่อีเมลมีคำว่า gmail หรือ yahoo โดยใช้ REGEXP",
            answer: "SELECT * FROM customers WHERE email REGEXP 'gmail|yahoo';",
            explanation:
              "REGEXP ใช้ค้นหาด้วย Regular Expression เครื่องหมาย | หมายถึง OR",
            keywords: ["SELECT", "WHERE", "REGEXP", "gmail", "yahoo"],
          },
        ],
      },
      {
        id: 9,
        title: "การจัดการค่า NULL",
        category: "SQL Basic",
        difficulty: "Easy - Advanced",
        schema:
          "employees(id INT, name VARCHAR(100), email VARCHAR(150), bonus DECIMAL(10,2))",
        questions: [
          {
            id: "9-1",
            type: "manual",
            prompt: "ค้นหาพนักงานที่ไม่มีอีเมล",
            answer: "SELECT * FROM employees WHERE email IS NULL;",
            explanation: "ใช้ IS NULL เพื่อตรวจสอบค่า NULL",
            keywords: ["SELECT", "WHERE", "IS NULL"],
          },
          {
            id: "9-2",
            type: "manual",
            prompt: "ค้นหาพนักงานที่มีอีเมลแล้ว",
            answer: "SELECT * FROM employees WHERE email IS NOT NULL;",
            explanation: "IS NOT NULL ใช้ค้นหาค่าที่ไม่ใช่ NULL",
            keywords: ["SELECT", "WHERE", "IS NOT NULL"],
          },
          {
            id: "9-3",
            type: "manual",
            prompt:
              "แสดงชื่อพนักงานและโบนัส หากโบนัสเป็น NULL ให้แสดง 0 โดยใช้ IFNULL",
            answer: "SELECT name, IFNULL(bonus, 0) AS bonus FROM employees;",
            explanation: "IFNULL ตรวจสอบค่าแรก หากเป็น NULL จะคืนค่าที่สอง",
            keywords: ["SELECT", "IFNULL", "bonus"],
          },
          {
            id: "9-4",
            type: "manual",
            prompt:
              "แสดงชื่อและโบนัส หาก bonus เป็น NULL ให้ใช้ค่า 1000 โดยใช้ COALESCE",
            answer:
              "SELECT name, COALESCE(bonus, 1000) AS bonus FROM employees;",
            explanation: "COALESCE คืนค่าตัวแรกที่ไม่ใช่ NULL",
            keywords: ["SELECT", "COALESCE", "bonus"],
          },
          {
            id: "9-5",
            type: "manual",
            prompt: "อธิบายเหตุผลที่ไม่ควรใช้เครื่องหมาย = NULL ใน SQL",
            answer:
              "NULL หมายถึงค่าที่ไม่ทราบหรือไม่มีค่า การเปรียบเทียบต้องใช้ IS NULL หรือ IS NOT NULL เพราะการใช้ = NULL จะได้ผลเป็น UNKNOWN",
            explanation:
              "SQL ใช้ Three-Valued Logic ได้แก่ TRUE, FALSE และ UNKNOWN",
            keywords: ["IS NULL", "UNKNOWN", "THREE-VALUED LOGIC"],
          },
        ],
      },
      {
        id: 10,
        title: "การใช้ฟังก์ชัน Aggregate",
        category: "SQL Aggregate",
        difficulty: "Easy - Advanced",
        schema:
          "sales(id INT, product_id INT, quantity INT, total_price DECIMAL(10,2))",
        questions: [
          {
            id: "10-1",
            type: "manual",
            prompt: "นับจำนวนรายการขายทั้งหมด",
            answer: "SELECT COUNT(*) AS total_sales FROM sales;",
            explanation: "COUNT(*) นับจำนวนแถวทั้งหมด",
            keywords: ["SELECT", "COUNT", "FROM", "sales"],
          },
          {
            id: "10-2",
            type: "manual",
            prompt: "หายอดขายรวมจากคอลัมน์ total_price",
            answer: "SELECT SUM(total_price) AS total_revenue FROM sales;",
            explanation: "SUM ใช้หาผลรวมของค่าตัวเลข",
            keywords: ["SELECT", "SUM", "total_price"],
          },
          {
            id: "10-3",
            type: "manual",
            prompt: "หาราคาขายเฉลี่ยต่อรายการ",
            answer: "SELECT AVG(total_price) AS average_price FROM sales;",
            explanation: "AVG ใช้คำนวณค่าเฉลี่ยของข้อมูลตัวเลข",
            keywords: ["SELECT", "AVG", "total_price"],
          },
          {
            id: "10-4",
            type: "manual",
            prompt: "หาราคาขายที่สูงที่สุดและต่ำที่สุด",
            answer:
              "SELECT MAX(total_price) AS max_price, MIN(total_price) AS min_price FROM sales;",
            explanation: "MAX หาค่าสูงสุด และ MIN หาค่าต่ำสุด",
            keywords: ["SELECT", "MAX", "MIN", "total_price"],
          },
          {
            id: "10-5",
            type: "manual",
            prompt:
              "แสดงจำนวนสินค้าที่ขายได้รวมทั้งหมด โดยใช้ SUM กับ quantity",
            answer: "SELECT SUM(quantity) AS total_quantity FROM sales;",
            explanation: "SUM รวมจำนวนสินค้าจากทุกรายการขาย",
            keywords: ["SELECT", "SUM", "quantity"],
          },
        ],
      },
    
      {
        id: 11,
        title: "การจัดกลุ่มข้อมูลด้วย GROUP BY",
        category: "SQL Aggregate",
        difficulty: "Easy - Advanced",
        schema:
          "employees(id INT, name VARCHAR(100), department_id INT, salary DECIMAL(10,2))",
        questions: [
          {
            id: "11-1",
            type: "manual",
            prompt: "แสดงจำนวนพนักงานในแต่ละแผนก",
            answer:
              "SELECT department_id, COUNT(*) AS total FROM employees GROUP BY department_id;",
            explanation: "GROUP BY รวมพนักงานตามรหัสแผนก และ COUNT นับจำนวน",
            keywords: ["SELECT", "COUNT", "GROUP BY", "department_id"],
          },
          {
            id: "11-2",
            type: "manual",
            prompt: "แสดงเงินเดือนเฉลี่ยของพนักงานในแต่ละแผนก",
            answer:
              "SELECT department_id, AVG(salary) AS average_salary FROM employees GROUP BY department_id;",
            explanation: "GROUP BY แยกกลุ่มตามแผนก และ AVG คำนวณค่าเฉลี่ย",
            keywords: ["SELECT", "AVG", "GROUP BY", "salary"],
          },
          {
            id: "11-3",
            type: "manual",
            prompt: "แสดงเงินเดือนรวมของพนักงานในแต่ละแผนก",
            answer:
              "SELECT department_id, SUM(salary) AS total_salary FROM employees GROUP BY department_id;",
            explanation: "SUM รวมเงินเดือนภายในแต่ละกลุ่ม",
            keywords: ["SELECT", "SUM", "GROUP BY"],
          },
          {
            id: "11-4",
            type: "manual",
            prompt: "แสดงแผนกที่มีพนักงานมากกว่า 5 คน",
            answer:
              "SELECT department_id, COUNT(*) AS total FROM employees GROUP BY department_id HAVING COUNT(*) > 5;",
            explanation: "HAVING ใช้กรองกลุ่มหลัง GROUP BY",
            keywords: ["GROUP BY", "HAVING", "COUNT"],
          },
          {
            id: "11-5",
            type: "manual",
            prompt:
              "แสดงแผนกที่มีเงินเดือนเฉลี่ยมากกว่า 30000 บาท และเรียงตามเงินเดือนเฉลี่ยจากมากไปน้อย",
            answer:
              "SELECT department_id, AVG(salary) AS average_salary FROM employees GROUP BY department_id HAVING AVG(salary) > 30000 ORDER BY average_salary DESC;",
            explanation:
              "HAVING กรองค่าเฉลี่ยของกลุ่ม และ ORDER BY เรียงผลลัพธ์",
            keywords: ["GROUP BY", "AVG", "HAVING", "ORDER BY", "DESC"],
          },
        ],
      },
      {
        id: 12,
        title: "การใช้ JOIN เชื่อมโยงตาราง",
        category: "SQL JOIN",
        difficulty: "Easy - Advanced",
        schema:
          "employees(id INT, name VARCHAR(100), department_id INT)\ndepartments(id INT, department_name VARCHAR(100))",
        questions: [
          {
            id: "12-1",
            type: "manual",
            prompt: "แสดงชื่อพนักงานพร้อมชื่อแผนก โดยใช้ INNER JOIN",
            answer:
              "SELECT e.name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id;",
            explanation:
              "INNER JOIN แสดงเฉพาะข้อมูลที่มีความสัมพันธ์กันทั้งสองตาราง",
            keywords: ["INNER JOIN", "ON", "employees", "departments"],
          },
          {
            id: "12-2",
            type: "manual",
            prompt:
              "แสดงพนักงานทุกคน แม้พนักงานจะยังไม่มีแผนก โดยใช้ LEFT JOIN",
            answer:
              "SELECT e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id;",
            explanation: "LEFT JOIN เก็บแถวทั้งหมดจากตารางด้านซ้าย",
            keywords: ["LEFT JOIN", "ON", "employees"],
          },
          {
            id: "12-3",
            type: "manual",
            prompt: "แสดงทุกแผนก แม้ไม่มีพนักงานอยู่ในแผนกนั้น",
            answer:
              "SELECT d.department_name, e.name FROM departments d LEFT JOIN employees e ON d.id = e.department_id;",
            explanation:
              "วาง departments ไว้ด้านซ้ายของ LEFT JOIN เพื่อให้แสดงทุกแผนก",
            keywords: ["LEFT JOIN", "departments", "employees", "ON"],
          },
          {
            id: "12-4",
            type: "manual",
            prompt: "ค้นหาพนักงานที่ไม่มีแผนก",
            answer:
              "SELECT e.* FROM employees e LEFT JOIN departments d ON e.department_id = d.id WHERE d.id IS NULL;",
            explanation:
              "ใช้ LEFT JOIN และตรวจสอบ NULL เพื่อหาแถวที่ไม่มีข้อมูลคู่สัมพันธ์",
            keywords: ["LEFT JOIN", "IS NULL", "WHERE"],
          },
          {
            id: "12-5",
            type: "manual",
            prompt:
              "เชื่อมตาราง employees, departments และ locations เพื่อแสดงชื่อพนักงาน ชื่อแผนก และชื่อสถานที่ โดย departments มี location_id และ locations มี id, location_name",
            answer:
              "SELECT e.name, d.department_name, l.location_name FROM employees e JOIN departments d ON e.department_id = d.id JOIN locations l ON d.location_id = l.id;",
            explanation:
              "สามารถเชื่อม JOIN หลายตารางต่อเนื่องกัน โดยกำหนดเงื่อนไข ON ให้ถูกต้อง",
            keywords: ["JOIN", "employees", "departments", "locations", "ON"],
          },
        ],
      },
      {
        id: 13,
        title: "การใช้ Subquery",
        category: "SQL Advanced",
        difficulty: "Medium - Advanced",
        schema:
          "employees(id INT, name VARCHAR(100), salary DECIMAL(10,2), department_id INT)",
        questions: [
          {
            id: "13-1",
            type: "manual",
            prompt:
              "ค้นหาพนักงานที่มีเงินเดือนสูงกว่าค่าเฉลี่ยของพนักงานทั้งหมด",
            answer:
              "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
            explanation:
              "Subquery คำนวณค่าเฉลี่ยก่อน แล้ว Query หลักใช้ค่าเปรียบเทียบ",
            keywords: ["SELECT", "WHERE", "AVG", "SUBQUERY"],
          },
          {
            id: "13-2",
            type: "manual",
            prompt: "ค้นหาพนักงานที่มีเงินเดือนสูงที่สุด",
            answer:
              "SELECT * FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);",
            explanation: "Subquery ใช้ MAX หาเงินเดือนสูงสุด",
            keywords: ["SELECT", "MAX", "WHERE"],
          },
          {
            id: "13-3",
            type: "manual",
            prompt:
              "ค้นหาพนักงานที่อยู่ในแผนกเดียวกับพนักงาน id = 5 โดยใช้ Subquery",
            answer:
              "SELECT * FROM employees WHERE department_id = (SELECT department_id FROM employees WHERE id = 5) AND id <> 5;",
            explanation:
              "Subquery ค้นหารหัสแผนกของพนักงาน id 5 ก่อนนำไปค้นหาพนักงานคนอื่น",
            keywords: ["SELECT", "WHERE", "SUBQUERY", "department_id"],
          },
          {
            id: "13-4",
            type: "manual",
            prompt: "ค้นหาพนักงานที่อยู่ในแผนก 1, 2 หรือ 3 โดยใช้ IN",
            answer: "SELECT * FROM employees WHERE department_id IN (1, 2, 3);",
            explanation: "IN ใช้ตรวจสอบว่าค่าตรงกับรายการใดรายการหนึ่งหรือไม่",
            keywords: ["SELECT", "WHERE", "IN"],
          },
          {
            id: "13-5",
            type: "manual",
            prompt:
              "ค้นหาพนักงานที่มีเงินเดือนสูงกว่าค่าเฉลี่ยเงินเดือนของแผนกตนเอง โดยใช้ Correlated Subquery",
            answer:
              "SELECT e.* FROM employees e WHERE e.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = e.department_id);",
            explanation:
              "Correlated Subquery อ้างอิงค่าจาก Query ชั้นนอก โดยคำนวณค่าเฉลี่ยตามแผนกของแต่ละคน",
            keywords: ["SELECT", "SUBQUERY", "AVG", "department_id"],
          },
        ],
      },
      {
        id: 14,
        title: "การใช้ฟังก์ชันจัดการข้อความ",
        category: "SQL Functions",
        difficulty: "Easy - Advanced",
        schema:
          "users(id INT, first_name VARCHAR(100), last_name VARCHAR(100), username VARCHAR(100))",
        questions: [
          {
            id: "14-1",
            type: "manual",
            prompt: "แสดงชื่อและนามสกุลโดยใช้ CONCAT ให้เป็นคอลัมน์เดียว",
            answer:
              "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;",
            explanation: "CONCAT ใช้เชื่อมข้อความหลายค่าเข้าด้วยกัน",
            keywords: ["SELECT", "CONCAT", "first_name", "last_name"],
          },
          {
            id: "14-2",
            type: "manual",
            prompt: "แสดง username เป็นตัวพิมพ์ใหญ่ทั้งหมด",
            answer: "SELECT UPPER(username) AS username FROM users;",
            explanation: "UPPER เปลี่ยนตัวอักษรเป็นตัวพิมพ์ใหญ่",
            keywords: ["SELECT", "UPPER", "username"],
          },
          {
            id: "14-3",
            type: "manual",
            prompt: "แสดง username เป็นตัวพิมพ์เล็กทั้งหมด",
            answer: "SELECT LOWER(username) AS username FROM users;",
            explanation: "LOWER เปลี่ยนตัวอักษรเป็นตัวพิมพ์เล็ก",
            keywords: ["SELECT", "LOWER", "username"],
          },
          {
            id: "14-4",
            type: "manual",
            prompt: "แสดงชื่อผู้ใช้โดยตัดช่องว่างด้านหน้าและด้านหลังออก",
            answer: "SELECT TRIM(username) AS username FROM users;",
            explanation: "TRIM ตัดช่องว่างด้านหน้าและด้านหลังข้อความ",
            keywords: ["SELECT", "TRIM", "username"],
          },
          {
            id: "14-5",
            type: "manual",
            prompt: "แสดง username จำนวน 5 ตัวอักษรแรก",
            answer: "SELECT LEFT(username, 5) AS short_username FROM users;",
            explanation: "LEFT คืนค่าข้อความจากด้านซ้ายตามจำนวนตัวอักษรที่ระบุ",
            keywords: ["SELECT", "LEFT", "username"],
          },
        ],
      },
      {
        id: 15,
        title: "การใช้ฟังก์ชันวันที่และเวลา",
        category: "SQL Date & Time",
        difficulty: "Easy - Advanced",
        schema:
          "orders(id INT, order_date DATETIME, total_amount DECIMAL(10,2))",
        questions: [
          {
            id: "15-1",
            type: "manual",
            prompt: "แสดงวันที่และเวลาปัจจุบันของฐานข้อมูล",
            answer: "SELECT NOW();",
            explanation: "NOW() คืนวันที่และเวลาปัจจุบัน",
            keywords: ["SELECT", "NOW"],
          },
          {
            id: "15-2",
            type: "manual",
            prompt:
              "ค้นหาคำสั่งซื้อทั้งหมดที่เกิดขึ้นในปี 2025 โดยใช้ช่วงวันที่",
            answer:
              "SELECT * FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';",
            explanation:
              "กำหนดช่วงต้นรวมและปลายไม่รวม เพื่อครอบคลุมทุกเวลาของปี 2025",
            keywords: [
              "SELECT",
              "WHERE",
              "order_date",
              "2025-01-01",
              "2026-01-01",
            ],
          },
          {
            id: "15-3",
            type: "manual",
            prompt: "แสดงปีของวันที่สั่งซื้อ",
            answer: "SELECT YEAR(order_date) AS order_year FROM orders;",
            explanation: "YEAR() คืนค่าปีจากวันที่",
            keywords: ["SELECT", "YEAR", "order_date"],
          },
          {
            id: "15-4",
            type: "manual",
            prompt: "แสดงเดือนของวันที่สั่งซื้อ",
            answer: "SELECT MONTH(order_date) AS order_month FROM orders;",
            explanation: "MONTH() คืนค่าตัวเลขเดือนตั้งแต่ 1 ถึง 12",
            keywords: ["SELECT", "MONTH", "order_date"],
          },
          {
            id: "15-5",
            type: "manual",
            prompt:
              "แสดงจำนวนคำสั่งซื้อแยกตามเดือนของปี 2025 โดยแสดงปีและเดือน",
            answer:
              "SELECT YEAR(order_date) AS order_year, MONTH(order_date) AS order_month, COUNT(*) AS total_orders FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01' GROUP BY YEAR(order_date), MONTH(order_date) ORDER BY order_year, order_month;",
            explanation:
              "ใช้ YEAR และ MONTH ร่วมกับ COUNT และ GROUP BY เพื่อสรุปข้อมูลรายเดือน",
            keywords: ["YEAR", "MONTH", "COUNT", "GROUP BY", "ORDER BY"],
          },
          
        ],
      },
      
  {
    id: 16,
    title: "INSERT – การเพิ่มข้อมูล",
    description: "ทดสอบคำสั่ง INSERT สำหรับเพิ่มข้อมูลลงในตาราง",
    questions: [
        {
            id: "16-1",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่มพนักงานชื่อ Somchai นามสกุล Jaidee แผนก IT เงินเดือน 30000 ลงในตาราง employees",
            answer: "INSERT INTO employees (first_name, last_name, department, salary) VALUES ('Somchai', 'Jaidee', 'IT', 30000);",
            explanation: "INSERT INTO ใช้เพิ่มข้อมูล โดยระบุชื่อคอลัมน์และค่าที่ต้องการเพิ่มตามลำดับ",
            keywords: ["INSERT INTO", "VALUES"]
        },
        {
            id: "16-2",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่มพนักงาน 2 คนในคำสั่งเดียว โดยคนแรกชื่อ Anan แผนก HR เงินเดือน 25000 และคนที่สองชื่อ Mana แผนก IT เงินเดือน 32000",
            answer: "INSERT INTO employees (first_name, department, salary) VALUES ('Anan', 'HR', 25000), ('Mana', 'IT', 32000);",
            explanation: "MySQL รองรับการ INSERT หลายแถวในคำสั่งเดียว โดยคั่นแต่ละชุดข้อมูลด้วยเครื่องหมายจุลภาค",
            keywords: ["INSERT INTO", "VALUES"]
        },
        {
            id: "16-3",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่มข้อมูลลงในตาราง departments โดยกำหนด department_id = 10 และ department_name = 'Finance'",
            answer: "INSERT INTO departments (department_id, department_name) VALUES (10, 'Finance');",
            explanation: "ระบุคอลัมน์และค่าที่ต้องการเพิ่มให้ตรงกับชนิดข้อมูลของคอลัมน์",
            keywords: ["INSERT INTO", "VALUES"]
        },
        {
            id: "16-4",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่มข้อมูลพนักงาน โดยกำหนดเฉพาะ first_name = 'Suda' และ department = 'Accounting' ส่วนคอลัมน์อื่นให้ใช้ค่า DEFAULT",
            answer: "INSERT INTO employees (first_name, department) VALUES ('Suda', 'Accounting');",
            explanation: "เมื่อไม่ระบุคอลัมน์ที่มีค่า DEFAULT ระบบจะใช้ค่าเริ่มต้นของคอลัมน์นั้น หากคอลัมน์อนุญาตให้เป็น NULL ก็อาจได้รับค่า NULL ตามข้อกำหนดของตาราง",
            keywords: ["INSERT INTO", "DEFAULT"]
        },
        {
            id: "16-5",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่มข้อมูลพนักงานจากผลลัพธ์ของ SELECT โดยคัดลอก first_name, department และ salary จากตาราง old_employees ไปยังตาราง employees",
            answer: "INSERT INTO employees (first_name, department, salary) SELECT first_name, department, salary FROM old_employees;",
            explanation: "INSERT INTO ... SELECT ใช้เพิ่มข้อมูลจากผลลัพธ์ของ SELECT โดยจำนวนและชนิดข้อมูลของคอลัมน์ต้องสอดคล้องกัน",
            keywords: ["INSERT INTO", "SELECT"]
        }
    ]
},
{
    id: 17,
    title: "INSERT SELECT และการนำเข้าข้อมูล",
    description: "ทดสอบการเพิ่มข้อมูลจากตารางอื่นและคำสั่งนำเข้าข้อมูลใน MySQL",
    questions: [
        {
            id: "17-1",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อคัดลอกพนักงานทั้งหมดจากตาราง employees ไปยังตาราง employees_backup โดยคัดลอกเฉพาะ employee_id, first_name และ salary",
            answer: "INSERT INTO employees_backup (employee_id, first_name, salary) SELECT employee_id, first_name, salary FROM employees;",
            explanation: "ใช้ INSERT INTO ร่วมกับ SELECT เพื่อคัดลอกข้อมูลจากตารางต้นทางไปยังตารางปลายทาง",
            keywords: ["INSERT INTO", "SELECT"]
        },
        {
            id: "17-2",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่มเฉพาะพนักงานแผนก IT จาก employees ไปยัง employees_backup",
            answer: "INSERT INTO employees_backup (employee_id, first_name, department) SELECT employee_id, first_name, department FROM employees WHERE department = 'IT';",
            explanation: "สามารถใช้ WHERE ใน SELECT เพื่อกรองข้อมูลก่อนนำไปเพิ่มในตารางปลายทาง",
            keywords: ["INSERT INTO", "SELECT", "WHERE"]
        },
        {
            id: "17-3",
            type: "manual",
            prompt: "อธิบายความแตกต่างระหว่าง INSERT INTO ... VALUES และ INSERT INTO ... SELECT",
            answer: "INSERT INTO ... VALUES ใช้เพิ่มข้อมูลจากค่าที่กำหนดโดยตรง ส่วน INSERT INTO ... SELECT ใช้เพิ่มข้อมูลจากผลลัพธ์ของคำสั่ง SELECT ในตารางหรือแหล่งข้อมูลอื่น",
            explanation: "ทั้งสองคำสั่งใช้เพิ่มข้อมูลเหมือนกัน แต่แตกต่างกันที่แหล่งที่มาของข้อมูล",
            keywords: ["VALUES", "SELECT"]
        },
        {
            id: "17-4",
            type: "manual",
            prompt: "เขียนตัวอย่างคำสั่ง MySQL LOAD DATA INFILE เพื่อนำเข้าข้อมูลจากไฟล์ employees.csv เข้าตาราง employees โดยกำหนดให้ข้อมูลในไฟล์คั่นด้วยเครื่องหมายจุลภาค",
            answer: "LOAD DATA INFILE '/path/employees.csv' INTO TABLE employees FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS;",
            explanation: "LOAD DATA INFILE ใช้นำเข้าข้อมูลจากไฟล์เข้าสู่ตาราง โดยต้องมีสิทธิ์เข้าถึงไฟล์และอยู่ภายใต้ข้อกำหนดของ MySQL เช่น secure_file_priv",
            keywords: ["LOAD DATA INFILE", "INTO TABLE"]
        },
        {
            id: "17-5",
            type: "manual",
            prompt: "คำสั่ง SELECT ... INTO OUTFILE ใน MySQL ใช้ทำอะไร และมีข้อควรระวังใดบ้าง",
            answer: "ใช้ส่งออกผลลัพธ์จาก SELECT ไปเป็นไฟล์บนเครื่องเซิร์ฟเวอร์ โดยต้องมีสิทธิ์ FILE และอยู่ภายใต้ข้อกำหนด secure_file_priv รวมถึงไม่สามารถเขียนทับไฟล์ที่มีอยู่แล้วได้",
            explanation: "SELECT ... INTO OUTFILE เป็นความสามารถเฉพาะของ MySQL สำหรับส่งออกข้อมูลไปยังไฟล์ ไม่ใช่คำสั่งสำหรับเพิ่มข้อมูลลงตาราง",
            keywords: ["SELECT", "INTO OUTFILE", "FILE"]
        }
    ]
},
{
    id: 18,
    title: "UPDATE – การแก้ไขข้อมูล",
    description: "ทดสอบการแก้ไขข้อมูลด้วย UPDATE และ UPDATE JOIN",
    questions: [
        {
            id: "18-1",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อปรับเงินเดือนพนักงาน employee_id = 5 เป็น 35000",
            answer: "UPDATE employees SET salary = 35000 WHERE employee_id = 5;",
            explanation: "UPDATE ใช้แก้ไขข้อมูล SET ใช้กำหนดค่าใหม่ และ WHERE ใช้ระบุแถวที่ต้องการแก้ไข",
            keywords: ["UPDATE", "SET", "WHERE"]
        },
        {
            id: "18-2",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่มเงินเดือนพนักงานแผนก IT ขึ้น 10%",
            answer: "UPDATE employees SET salary = salary * 1.10 WHERE department = 'IT';",
            explanation: "สามารถนำค่าปัจจุบันของคอลัมน์มาใช้คำนวณเพื่อกำหนดค่าใหม่ได้",
            keywords: ["UPDATE", "SET", "WHERE"]
        },
        {
            id: "18-3",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเปลี่ยน department เป็น 'Management' สำหรับพนักงานที่อยู่แผนก IT และมีเงินเดือนมากกว่า 40000",
            answer: "UPDATE employees SET department = 'Management' WHERE department = 'IT' AND salary > 40000;",
            explanation: "ใช้ AND เพื่อกำหนดให้เงื่อนไขทั้งสองต้องเป็นจริง",
            keywords: ["UPDATE", "WHERE", "AND"]
        },
        {
            id: "18-4",
            type: "manual",
            prompt: "เขียนคำสั่ง MySQL UPDATE JOIN เพื่อกำหนด employees.department_name ให้ตรงกับ departments.department_name โดยเชื่อมผ่าน department_id",
            answer: "UPDATE employees e JOIN departments d ON e.department_id = d.department_id SET e.department_name = d.department_name;",
            explanation: "MySQL รองรับ UPDATE ร่วมกับ JOIN เพื่อแก้ไขข้อมูลโดยอ้างอิงจากตารางอื่น",
            keywords: ["UPDATE", "JOIN", "SET", "ON"]
        },
        {
            id: "18-5",
            type: "manual",
            prompt: "หากต้องการเพิ่มเงินเดือนพนักงานทุกคน 1000 บาท ต้องเขียนคำสั่ง SQL อย่างไร และมีข้อควรระวังอะไร",
            answer: "UPDATE employees SET salary = salary + 1000;",
            explanation: "การไม่ระบุ WHERE หมายถึงแก้ไขข้อมูลทุกแถว จึงควรตรวจสอบเงื่อนไขและสำรองข้อมูลก่อนดำเนินการ",
            keywords: ["UPDATE", "SET"]
        }
    ]
},
{
    id: 19,
    title: "DELETE – การลบข้อมูล",
    description: "ทดสอบการลบข้อมูลแบบระบุเงื่อนไขและการลบข้อมูลหลายตาราง",
    questions: [
        {
            id: "19-1",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อลบพนักงานที่มี employee_id = 10 ออกจากตาราง employees",
            answer: "DELETE FROM employees WHERE employee_id = 10;",
            explanation: "DELETE FROM ใช้ลบแถวข้อมูล โดย WHERE ระบุแถวที่ต้องการลบ",
            keywords: ["DELETE FROM", "WHERE"]
        },
        {
            id: "19-2",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อลบพนักงานทั้งหมดที่อยู่ในแผนก IT",
            answer: "DELETE FROM employees WHERE department = 'IT';",
            explanation: "เงื่อนไข WHERE จะกำหนดให้ลบเฉพาะแถวที่มี department เท่ากับ IT",
            keywords: ["DELETE FROM", "WHERE"]
        },
        {
            id: "19-3",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อลบข้อมูลพนักงานที่มีเงินเดือนต่ำกว่า 15000 หรือไม่มีค่าเงินเดือน (NULL)",
            answer: "DELETE FROM employees WHERE salary < 15000 OR salary IS NULL;",
            explanation: "การตรวจสอบค่า NULL ต้องใช้ IS NULL ไม่ควรใช้ salary = NULL",
            keywords: ["DELETE FROM", "WHERE", "IS NULL", "OR"]
        },
        {
            id: "19-4",
            type: "manual",
            prompt: "เขียนคำสั่ง MySQL เพื่อลบข้อมูลพนักงานในแผนก IT โดยใช้ DELETE ร่วมกับ JOIN ตาราง departments และเชื่อมด้วย department_id",
            answer: "DELETE e FROM employees e JOIN departments d ON e.department_id = d.department_id WHERE d.department_name = 'IT';",
            explanation: "MySQL รองรับการลบข้อมูลจากตารางที่ระบุโดยใช้ JOIN เพื่อกำหนดเงื่อนไขจากอีกตารางหนึ่ง",
            keywords: ["DELETE", "JOIN", "WHERE"]
        },
        {
            id: "19-5",
            type: "manual",
            prompt: "หากต้องการลบข้อมูลทั้งหมดในตาราง employees แต่ยังคงโครงสร้างตารางไว้ สามารถใช้คำสั่งใดได้บ้าง",
            answer: "DELETE FROM employees; หรือ TRUNCATE TABLE employees;",
            explanation: "ทั้งสองคำสั่งลบข้อมูลทั้งหมดแต่ยังคงตารางไว้ โดยมีความแตกต่างด้านการทำงานและพฤติกรรมของ Transaction ซึ่งต้องพิจารณาชนิด Storage Engine และ Foreign Key ด้วย",
            keywords: ["DELETE FROM", "TRUNCATE TABLE"]
        }
    ]
},
{
    id: 20,
    title: "DELETE, TRUNCATE และ DROP",
    description: "ทดสอบความแตกต่างของคำสั่งลบข้อมูลและลบโครงสร้างตาราง",
    questions: [
        {
            id: "20-1",
            type: "manual",
            prompt: "อธิบายความแตกต่างระหว่าง DELETE FROM, TRUNCATE TABLE และ DROP TABLE",
            answer: "DELETE ใช้ลบแถวข้อมูลและสามารถกำหนด WHERE ได้, TRUNCATE ใช้ลบข้อมูลทุกแถวโดยคงโครงสร้างตารางไว้, DROP ใช้ลบทั้งข้อมูลและโครงสร้างตาราง",
            explanation: "ทั้งสามคำสั่งมีผลกระทบต่างกัน โดย DROP มีผลต่อโครงสร้างฐานข้อมูลด้วย",
            keywords: ["DELETE", "TRUNCATE", "DROP"]
        },
        {
            id: "20-2",
            type: "manual",
            prompt: "คำสั่งใดสามารถใช้ WHERE เพื่อเลือกแถวข้อมูลที่ต้องการลบได้",
            answer: "DELETE FROM table_name WHERE condition;",
            explanation: "DELETE รองรับ WHERE ส่วน TRUNCATE และ DROP ไม่รองรับ WHERE",
            keywords: ["DELETE", "WHERE"]
        },
        {
            id: "20-3",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อลบตาราง employees_backup ออกจากฐานข้อมูล",
            answer: "DROP TABLE employees_backup;",
            explanation: "DROP TABLE ใช้ลบตารางออกจากฐานข้อมูล รวมถึงข้อมูลและโครงสร้างตาราง",
            keywords: ["DROP TABLE"]
        },
        {
            id: "20-4",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อลบข้อมูลทั้งหมดในตาราง logs โดยยังคงโครงสร้างตารางไว้ และใช้คำสั่ง TRUNCATE",
            answer: "TRUNCATE TABLE logs;",
            explanation: "TRUNCATE TABLE ใช้ลบข้อมูลทั้งหมดอย่างรวดเร็ว แต่ไม่สามารถกำหนดเงื่อนไข WHERE ได้",
            keywords: ["TRUNCATE TABLE"]
        },
        {
            id: "20-5",
            type: "manual",
            prompt: "ใน MySQL คำสั่ง TRUNCATE TABLE สามารถ ROLLBACK ได้เหมือน DELETE หรือไม่",
            answer: "โดยทั่วไป TRUNCATE TABLE เป็น DDL ที่ทำให้เกิด implicit commit จึงไม่สามารถ ROLLBACK กลับได้เหมือน DELETE ภายใน Transaction",
            explanation: "ต้องแยกความแตกต่างระหว่าง DELETE ซึ่งเป็น DML กับ TRUNCATE ซึ่งเป็น DDL ใน MySQL",
            keywords: ["TRUNCATE", "ROLLBACK", "DDL", "COMMIT"]
        }
    ]
},


{
    id: 21,
    title: "INSERT IGNORE, REPLACE และ ON DUPLICATE KEY UPDATE",
    description: "ทดสอบการจัดการข้อมูลเมื่อเกิด Primary Key หรือ Unique Key ซ้ำใน MySQL",
    questions: [
        {
            id: "21-1",
            type: "manual",
            prompt: "คำสั่ง INSERT IGNORE ใน MySQL มีวัตถุประสงค์เพื่ออะไร",
            answer: "ใช้เพิ่มข้อมูลโดยให้ MySQL จัดการข้อผิดพลาดบางประเภท เช่น ข้อมูลซ้ำที่ชนกับ PRIMARY KEY หรือ UNIQUE KEY โดยเปลี่ยนข้อผิดพลาดบางรายการเป็น Warning และข้ามแถวที่มีปัญหา",
            explanation: "INSERT IGNORE ไม่ได้หมายความว่าจะละเว้นข้อผิดพลาดทุกชนิด และอาจมีการปรับค่าบางอย่างตาม SQL mode",
            keywords: ["INSERT IGNORE", "PRIMARY KEY", "UNIQUE"]
        },
        {
            id: "21-2",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อเพิ่ม employee_id = 1 ชื่อ Anan เงินเดือน 30000 แต่หาก employee_id ซ้ำ ให้ปรับเงินเดือนเป็นค่าที่ส่งเข้ามา",
            answer: "INSERT INTO employees (employee_id, first_name, salary) VALUES (1, 'Anan', 30000) ON DUPLICATE KEY UPDATE salary = VALUES(salary);",
            explanation: "ON DUPLICATE KEY UPDATE ทำงานเมื่อเกิดการชนกับ PRIMARY KEY หรือ UNIQUE KEY โดย VALUES(column) เป็นรูปแบบที่พบใน MySQL รุ่นเดิมและถูกเลิกแนะนำใน MySQL รุ่นใหม่ ควรใช้ alias ของแถวที่เพิ่มเข้ามาใน MySQL 8.0.19 ขึ้นไป",
            keywords: ["INSERT INTO", "ON DUPLICATE KEY UPDATE"]
        },
        {
            id: "21-3",
            type: "manual",
            prompt: "คำสั่ง REPLACE INTO ใน MySQL ทำงานอย่างไรเมื่อพบข้อมูลที่มี PRIMARY KEY ซ้ำ",
            answer: "REPLACE INTO จะลบแถวเดิมที่ชนกับ PRIMARY KEY หรือ UNIQUE KEY ก่อน แล้วจึงเพิ่มแถวใหม่เข้าไป",
            explanation: "REPLACE ไม่ใช่ UPDATE โดยตรง การลบและเพิ่มใหม่อาจส่งผลต่อ AUTO_INCREMENT, Foreign Key และ Trigger",
            keywords: ["REPLACE INTO", "PRIMARY KEY"]
        },
        {
            id: "21-4",
            type: "manual",
            prompt: "เขียนตัวอย่างคำสั่ง MySQL เพื่อเพิ่มข้อมูลสินค้า product_id = 10 ชื่อ Keyboard ราคา 1200 หากรหัสสินค้าซ้ำให้ปรับราคาเป็น 1200",
            answer: "INSERT INTO products (product_id, product_name, price) VALUES (10, 'Keyboard', 1200) AS new ON DUPLICATE KEY UPDATE price = new.price;",
            explanation: "MySQL 8.0.19 ขึ้นไปรองรับ row alias หลัง VALUES เพื่อนำค่าของแถวใหม่มาใช้ในส่วน ON DUPLICATE KEY UPDATE",
            keywords: ["INSERT INTO", "AS", "ON DUPLICATE KEY UPDATE"]
        },
        {
            id: "21-5",
            type: "manual",
            prompt: "เปรียบเทียบ INSERT IGNORE, REPLACE INTO และ INSERT ... ON DUPLICATE KEY UPDATE",
            answer: "INSERT IGNORE ข้ามแถวที่มีปัญหาบางประเภทและเพิ่มแถวอื่นต่อ, REPLACE ลบแถวเดิมที่ชนแล้วเพิ่มแถวใหม่, ON DUPLICATE KEY UPDATE แก้ไขแถวเดิมเมื่อพบ PRIMARY KEY หรือ UNIQUE KEY ซ้ำ",
            explanation: "ควรเลือกใช้ให้เหมาะกับความต้องการ เพราะแต่ละคำสั่งมีผลต่อข้อมูลเดิมและ Trigger แตกต่างกัน",
            keywords: ["INSERT IGNORE", "REPLACE", "ON DUPLICATE KEY UPDATE"]
        }
    ]
},
{
    id: 22,
    title: "Transaction – COMMIT และ ROLLBACK",
    description: "ทดสอบการจัดการ Transaction ในฐานข้อมูล MySQL",
    questions: [
        {
            id: "22-1",
            type: "manual",
            prompt: "คำสั่ง START TRANSACTION ใช้สำหรับอะไร",
            answer: "ใช้เริ่มต้น Transaction เพื่อรวมคำสั่ง SQL หลายคำสั่งให้เป็นหน่วยการทำงานเดียวที่สามารถ COMMIT หรือ ROLLBACK ได้",
            explanation: "Transaction ช่วยควบคุมความถูกต้องของข้อมูลเมื่อมีการทำงานหลายขั้นตอนที่เกี่ยวข้องกัน",
            keywords: ["START TRANSACTION", "TRANSACTION"]
        },
        {
            id: "22-2",
            type: "manual",
            prompt: "คำสั่ง COMMIT มีหน้าที่อะไร",
            answer: "ใช้ยืนยันการเปลี่ยนแปลงข้อมูลภายใน Transaction ให้มีผลถาวร",
            explanation: "หลัง COMMIT แล้วจะไม่สามารถใช้ ROLLBACK ของ Transaction เดิมเพื่อย้อนกลับการเปลี่ยนแปลงได้",
            keywords: ["COMMIT", "TRANSACTION"]
        },
        {
            id: "22-3",
            type: "manual",
            prompt: "คำสั่ง ROLLBACK มีหน้าที่อะไร",
            answer: "ใช้ยกเลิกการเปลี่ยนแปลงที่ยังไม่ได้ COMMIT ภายใน Transaction ปัจจุบัน",
            explanation: "ROLLBACK ใช้ย้อนกลับการเปลี่ยนแปลงที่ยังไม่ถูกยืนยัน โดยขึ้นอยู่กับ Storage Engine ที่รองรับ Transaction",
            keywords: ["ROLLBACK", "TRANSACTION"]
        },
        {
            id: "22-4",
            type: "manual",
            prompt: "เขียนชุดคำสั่ง SQL เพื่อโอนเงิน 1000 บาทจากบัญชี account_id = 1 ไปยัง account_id = 2 โดยใช้ Transaction",
            answer: "START TRANSACTION; UPDATE accounts SET balance = balance - 1000 WHERE account_id = 1; UPDATE accounts SET balance = balance + 1000 WHERE account_id = 2; COMMIT;",
            explanation: "การโอนเงินควรทำทั้งสองรายการภายใน Transaction เดียว หากขั้นตอนใดล้มเหลวควร ROLLBACK เพื่อป้องกันยอดเงินไม่ตรงกัน",
            keywords: ["START TRANSACTION", "UPDATE", "COMMIT"]
        },
        {
            id: "22-5",
            type: "manual",
            prompt: "หากต้องการแก้ไขข้อมูลภายใน Transaction แต่ภายหลังพบข้อผิดพลาดและต้องการยกเลิกการเปลี่ยนแปลงทั้งหมด ควรใช้คำสั่งใด",
            answer: "ROLLBACK;",
            explanation: "ROLLBACK จะยกเลิกการเปลี่ยนแปลงที่ยังไม่ได้ COMMIT ใน Transaction ปัจจุบัน",
            keywords: ["ROLLBACK"]
        }
    ]
},
{
    id: 23,
    title: "SAVEPOINT และการย้อนกลับบางส่วน",
    description: "ทดสอบการกำหนดจุดย้อนกลับภายใน Transaction",
    questions: [
        {
            id: "23-1",
            type: "manual",
            prompt: "คำสั่ง SAVEPOINT ใช้สำหรับอะไร",
            answer: "ใช้กำหนดจุดบันทึกภายใน Transaction เพื่อให้สามารถย้อนกลับไปยังจุดนั้นได้โดยไม่ต้องยกเลิก Transaction ทั้งหมด",
            explanation: "SAVEPOINT ช่วยให้ควบคุมการย้อนกลับของ Transaction ได้ละเอียดขึ้น",
            keywords: ["SAVEPOINT", "TRANSACTION"]
        },
        {
            id: "23-2",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อสร้าง SAVEPOINT ชื่อ sp1",
            answer: "SAVEPOINT sp1;",
            explanation: "SAVEPOINT ตามด้วยชื่อจุดบันทึกที่ต้องการกำหนด",
            keywords: ["SAVEPOINT"]
        },
        {
            id: "23-3",
            type: "manual",
            prompt: "คำสั่ง ROLLBACK TO SAVEPOINT sp1 ใช้ทำอะไร",
            answer: "ใช้ย้อนกลับการเปลี่ยนแปลงภายใน Transaction ไปยัง SAVEPOINT ชื่อ sp1 โดยไม่ยกเลิก Transaction ทั้งหมด",
            explanation: "การย้อนกลับไปยัง SAVEPOINT จะไม่ทำให้ Transaction สิ้นสุด",
            keywords: ["ROLLBACK TO SAVEPOINT"]
        },
        {
            id: "23-4",
            type: "manual",
            prompt: "คำสั่ง RELEASE SAVEPOINT sp1 ใช้ทำอะไร",
            answer: "ใช้ลบจุด SAVEPOINT ชื่อ sp1 ออกจาก Transaction ปัจจุบัน โดยไม่ได้ยกเลิกการเปลี่ยนแปลงข้อมูล",
            explanation: "RELEASE SAVEPOINT ใช้จัดการจุดย้อนกลับ ไม่ใช่คำสั่ง COMMIT หรือ ROLLBACK",
            keywords: ["RELEASE SAVEPOINT"]
        },
        {
            id: "23-5",
            type: "manual",
            prompt: "เขียนชุดคำสั่ง SQL เพื่อเริ่ม Transaction เพิ่มเงินบัญชี 1 จำนวน 500 บาท สร้าง SAVEPOINT ชื่อ sp1 จากนั้นลดเงินบัญชี 2 จำนวน 200 บาท แล้วให้ย้อนกลับไปที่ sp1 และ COMMIT",
            answer: "START TRANSACTION; UPDATE accounts SET balance = balance + 500 WHERE account_id = 1; SAVEPOINT sp1; UPDATE accounts SET balance = balance - 200 WHERE account_id = 2; ROLLBACK TO SAVEPOINT sp1; COMMIT;",
            explanation: "การย้อนกลับไปที่ sp1 จะยกเลิกเฉพาะคำสั่งหลังจุด SAVEPOINT ส่วนการเพิ่มเงินบัญชี 1 ก่อนหน้านั้นยังคงอยู่และถูกยืนยันเมื่อ COMMIT",
            keywords: ["START TRANSACTION", "SAVEPOINT", "ROLLBACK TO SAVEPOINT", "COMMIT"]
        }
    ]
},
{
    id: 24,
    title: "ACID และ Transaction Isolation",
    description: "ทดสอบคุณสมบัติ ACID และปรากฏการณ์ที่เกิดจากการทำงานพร้อมกันของ Transaction",
    questions: [
        {
            id: "24-1",
            type: "manual",
            prompt: "อธิบายคุณสมบัติ ACID ของ Transaction ทั้ง 4 ประการ",
            answer: "Atomicity คือทำงานทั้งหมดหรือไม่ทำเลย, Consistency คือรักษาความถูกต้องของข้อมูลตามข้อกำหนด, Isolation คือแยกการทำงานของ Transaction ที่เกิดพร้อมกัน, Durability คือข้อมูลที่ COMMIT แล้วคงอยู่แม้ระบบขัดข้อง",
            explanation: "ACID เป็นคุณสมบัติหลักที่ช่วยให้ Transaction มีความน่าเชื่อถือ",
            keywords: ["Atomicity", "Consistency", "Isolation", "Durability"]
        },
        {
            id: "24-2",
            type: "manual",
            prompt: "Dirty Read คืออะไร",
            answer: "เป็นเหตุการณ์ที่ Transaction หนึ่งอ่านข้อมูลที่อีก Transaction แก้ไขแล้วแต่ยังไม่ได้ COMMIT หาก Transaction ต้นทาง ROLLBACK ข้อมูลที่อ่านมาอาจไม่เคยเป็นข้อมูลที่ถูกยืนยันจริง",
            explanation: "Dirty Read เป็นปัญหาความสอดคล้องของข้อมูลที่เกี่ยวข้องกับระดับ Isolation",
            keywords: ["Dirty Read", "ROLLBACK", "Transaction"]
        },
        {
            id: "24-3",
            type: "manual",
            prompt: "Non-repeatable Read คืออะไร",
            answer: "เป็นเหตุการณ์ที่ Transaction อ่านแถวข้อมูลเดิมสองครั้ง แต่ได้ค่าต่างกัน เนื่องจาก Transaction อื่นแก้ไขและ COMMIT ข้อมูลระหว่างการอ่าน",
            explanation: "เกิดจากข้อมูลแถวเดียวกันถูกเปลี่ยนแปลงระหว่างการอ่านหลายครั้ง",
            keywords: ["Non-repeatable Read", "COMMIT"]
        },
        {
            id: "24-4",
            type: "manual",
            prompt: "Phantom Read คืออะไร",
            answer: "เป็นเหตุการณ์ที่ Transaction ทำคำสั่งค้นหาด้วยเงื่อนไขเดิมซ้ำ แต่จำนวนแถวหรือชุดแถวที่ได้เปลี่ยนไป เนื่องจาก Transaction อื่นเพิ่ม ลบ หรือแก้ไขข้อมูลจนเข้าเงื่อนไข",
            explanation: "Phantom Read เกี่ยวข้องกับการเปลี่ยนแปลงชุดแถวที่ตรงกับเงื่อนไขการค้นหา",
            keywords: ["Phantom Read", "Transaction"]
        },
        {
            id: "24-5",
            type: "manual",
            prompt: "ระดับ Isolation ของ Transaction ใน MySQL มีอะไรบ้าง เรียงจากต่ำไปสูง",
            answer: "READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ และ SERIALIZABLE",
            explanation: "MySQL InnoDB ใช้ REPEATABLE READ เป็นค่าเริ่มต้น โดยระดับ Isolation แต่ละระดับมีผลต่อการมองเห็นข้อมูลและการล็อกที่แตกต่างกัน",
            keywords: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"]
        }
    ]
},
{
    id: 25,
    title: "Data Integrity และ Foreign Key",
    description: "ทดสอบความถูกต้องของข้อมูล ข้อจำกัดของตาราง และการกำหนดความสัมพันธ์",
    questions: [
        {
            id: "25-1",
            type: "manual",
            prompt: "Data Integrity คืออะไร และมีความสำคัญอย่างไรต่อฐานข้อมูล",
            answer: "Data Integrity คือการรักษาความถูกต้อง ความสอดคล้อง และความน่าเชื่อถือของข้อมูล เพื่อให้ข้อมูลไม่ผิดพลาดหรือขัดแย้งกัน",
            explanation: "ช่วยให้ข้อมูลมีคุณภาพและสามารถนำไปใช้ประมวลผลหรือรายงานได้อย่างถูกต้อง",
            keywords: ["Data Integrity", "Accuracy", "Consistency"]
        },
        {
            id: "25-2",
            type: "manual",
            prompt: "อธิบายความแตกต่างระหว่าง PRIMARY KEY และ FOREIGN KEY",
            answer: "PRIMARY KEY ใช้ระบุแถวข้อมูลแต่ละแถวให้ไม่ซ้ำกันและห้ามเป็น NULL ส่วน FOREIGN KEY ใช้สร้างความสัมพันธ์และควบคุมการอ้างอิงข้อมูลระหว่างตาราง",
            explanation: "PRIMARY KEY ใช้ระบุตัวตนของข้อมูล ส่วน FOREIGN KEY ใช้รักษาความถูกต้องของความสัมพันธ์ระหว่างตาราง",
            keywords: ["PRIMARY KEY", "FOREIGN KEY"]
        },
        {
            id: "25-3",
            type: "manual",
            prompt: "เขียนคำสั่ง SQL เพื่อสร้าง Foreign Key ในตาราง employees โดยกำหนด department_id ให้อ้างอิง department_id ของตาราง departments และเมื่อมีการลบแผนกให้กำหนดค่า department_id ของพนักงานเป็น NULL",
            answer: "ALTER TABLE employees ADD CONSTRAINT fk_employees_department FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL;",
            explanation: "ON DELETE SET NULL จะกำหนดค่า Foreign Key ฝั่งลูกเป็น NULL เมื่อแถวที่ถูกอ้างอิงถูกลบ โดยคอลัมน์ department_id ต้องอนุญาตให้เป็น NULL",
            keywords: ["ALTER TABLE", "FOREIGN KEY", "REFERENCES", "ON DELETE SET NULL"]
        },
        {
            id: "25-4",
            type: "manual",
            prompt: "ON DELETE CASCADE มีหน้าที่อย่างไร",
            answer: "เมื่อแถวข้อมูลในตารางแม่ถูกลบ แถวข้อมูลในตารางลูกที่อ้างอิงแถวนั้นจะถูกลบตามโดยอัตโนมัติ",
            explanation: "ควรใช้ด้วยความระมัดระวัง เพราะการลบข้อมูลตารางแม่อาจทำให้ข้อมูลในตารางลูกถูกลบจำนวนมาก",
            keywords: ["ON DELETE CASCADE", "FOREIGN KEY"]
        },
        {
            id: "25-5",
            type: "manual",
            prompt: "การเปิดใช้งาน MySQL Safe Update Mode มีวัตถุประสงค์เพื่ออะไร และสามารถเปิดใช้งานได้อย่างไรใน Session ปัจจุบัน",
            answer: "ใช้ป้องกันการ UPDATE หรือ DELETE ที่อาจกระทบข้อมูลจำนวนมากโดยไม่มีเงื่อนไขที่เหมาะสม สามารถเปิดใช้งานด้วย SET SQL_SAFE_UPDATES = 1;",
            explanation: "Safe Update Mode เป็นมาตรการช่วยป้องกันความผิดพลาด ไม่ใช่ระบบสำรองข้อมูลหรือมาตรการรักษาความปลอดภัยที่ทดแทนการตรวจสอบ WHERE ได้ทั้งหมด",
            keywords: ["SQL_SAFE_UPDATES", "UPDATE", "DELETE"]
        }
    ]
},

];

/*
|--------------------------------------------------------------------------
| ตรวจสอบจำนวนข้อสอบ
|--------------------------------------------------------------------------
*/

(function validateQuestionBank() {
    const groups = window.QUESTION_BANK;

    if (!Array.isArray(groups)) {
        console.error("ไม่พบ QUESTION_BANK หรือข้อมูลไม่ใช่ Array");
        return;
    }

    const totalQuestions = groups.reduce(
        (total, group) => total + group.questions.length,
        0
    );

    console.info("Question Bank:", {
        majorQuestions: groups.length,
        subQuestions: totalQuestions,
        targetMajorQuestions: 55,
        targetSubQuestions: 275
    });

    if (groups.some(group => group.questions.length !== 5)) {
        console.error("พบข้อใหญ่ที่ไม่ได้มีข้อย่อยครบ 5 ข้อ");
    }

    const ids = groups.flatMap(group =>
        group.questions.map(question => question.id)
    );

    if (new Set(ids).size !== ids.length) {
        console.error("พบรหัสข้อสอบซ้ำกัน");
    }
})();

/*
|--------------------------------------------------------------------------
| SQL PRACTICE EXAM - QUESTIONS 26-50
|--------------------------------------------------------------------------
| MySQL 8.0+
| 25 ข้อใหญ่ x 5 ข้อย่อย = 125 ข้อย่อย
| นำโค้ดนี้ไปวางท้าย questions.js เดิมได้ทันที
|--------------------------------------------------------------------------
*/

(function () {
    "use strict";

    if (!Array.isArray(window.QUESTION_BANK)) {
        console.error("กรุณาโหลดคลังข้อสอบ 1-25 ก่อน");
        return;
    }

    // สร้างข้อสอบย่อย
    function Q(id, prompt, answer, explanation) {
        return {
            id: id,
            type: "manual",
            prompt: prompt,
            answer: answer,
            explanation: explanation,
            keywords: []
        };
    }

    // สร้างข้อสอบใหญ่
    function G(id, title, description, questions) {
        return {
            id: id,
            title: title,
            description: description,
            questions: questions
        };
    }

    const newQuestions = [

        // ==================================================
        // 26. CONSTRAINTS
        // ==================================================
        G(26, "Constraints ใน MySQL",
        "NOT NULL, UNIQUE, DEFAULT และ CHECK", [

            Q("26-1",
              "สร้างตาราง students ที่มี id เป็น INT PRIMARY KEY และ name เป็น VARCHAR(100) NOT NULL",
              "CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(100) NOT NULL);",
              "NOT NULL บังคับให้คอลัมน์ต้องไม่เป็น NULL"),

            Q("26-2",
              "สร้างตาราง users ที่มี id เป็น PRIMARY KEY และ email ต้องไม่ซ้ำกัน",
              "CREATE TABLE users (id INT PRIMARY KEY, email VARCHAR(255) UNIQUE);",
              "UNIQUE ใช้ป้องกันค่าซ้ำในคอลัมน์ที่กำหนด"),

            Q("26-3",
              "เพิ่มคอลัมน์ status ในตาราง employees โดยกำหนดค่าเริ่มต้นเป็น active",
              "ALTER TABLE employees ADD COLUMN status VARCHAR(20) DEFAULT 'active';",
              "DEFAULT ใช้กำหนดค่าเริ่มต้นของคอลัมน์"),

            Q("26-4",
              "สร้างตาราง products ที่มี price เป็น DECIMAL(10,2) และกำหนด CHECK ให้ราคามากกว่าหรือเท่ากับ 0",
              "CREATE TABLE products (id INT PRIMARY KEY, price DECIMAL(10,2), CONSTRAINT chk_price CHECK (price >= 0));",
              "CHECK ใช้ตรวจสอบเงื่อนไขของข้อมูล โดย MySQL 8.0.16 ขึ้นไปบังคับใช้ CHECK"),

            Q("26-5",
              "อธิบายความแตกต่างระหว่าง NOT NULL และ UNIQUE",
              "NOT NULL ป้องกันค่า NULL ส่วน UNIQUE ป้องกันค่าซ้ำ โดย UNIQUE ใน MySQL สามารถมีค่า NULL ได้หลายแถว",
              "ทั้งสอง Constraint มีหน้าที่ต่างกันและสามารถใช้ร่วมกันได้")
        ]),

        // ==================================================
        // 27. PRIMARY KEY
        // ==================================================
        G(27, "Primary Key และ Auto Increment",
        "การกำหนดคีย์หลักและ Composite Key", [

            Q("27-1",
              "สร้างตาราง employees ที่มี id เป็น INT AUTO_INCREMENT PRIMARY KEY",
              "CREATE TABLE employees (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100));",
              "AUTO_INCREMENT ใช้สร้างค่าตัวเลขเพิ่มอัตโนมัติ"),

            Q("27-2",
              "เพิ่ม Primary Key ให้คอลัมน์ employee_id ของตาราง employees",
              "ALTER TABLE employees ADD PRIMARY KEY (employee_id);",
              "ตารางหนึ่งมี Primary Key ได้เพียงหนึ่งชุด"),

            Q("27-3",
              "สร้างตาราง enrollments โดยใช้ student_id และ course_id เป็น Composite Primary Key",
              "CREATE TABLE enrollments (student_id INT NOT NULL, course_id INT NOT NULL, PRIMARY KEY (student_id, course_id));",
              "Composite Primary Key ใช้หลายคอลัมน์ร่วมกันระบุเอกลักษณ์ของแถว"),

            Q("27-4",
              "อธิบายว่า Primary Key สามารถมีค่า NULL หรือค่าซ้ำได้หรือไม่",
              "PRIMARY KEY ไม่อนุญาตให้มีค่า NULL และไม่อนุญาตให้มีค่าซ้ำ",
              "Primary Key ใช้ระบุแต่ละแถวอย่างเป็นเอกลักษณ์"),

            Q("27-5",
              "ลบ Primary Key ออกจากตาราง employees ด้วย ALTER TABLE",
              "ALTER TABLE employees DROP PRIMARY KEY;",
              "ก่อนลบ Primary Key ต้องพิจารณา Foreign Key และข้อกำหนด AUTO_INCREMENT ที่เกี่ยวข้อง")
        ]),

        // ==================================================
        // 28. FOREIGN KEY
        // ==================================================
        G(28, "Foreign Key และ Referential Integrity",
        "การเชื่อมโยงตารางและ Referential Actions", [

            Q("28-1",
              "สร้างตาราง departments ที่มี department_id เป็น Primary Key",
              "CREATE TABLE departments (department_id INT PRIMARY KEY, department_name VARCHAR(100));",
              "ตารางแม่ควรมีคีย์ที่เหมาะสมสำหรับการอ้างอิง"),

            Q("28-2",
              "สร้างตาราง employees ที่มี Foreign Key department_id อ้างอิง departments(department_id)",
              "CREATE TABLE employees (employee_id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(department_id)) ENGINE=InnoDB;",
              "Foreign Key รักษาความถูกต้องของความสัมพันธ์ระหว่างตาราง"),

            Q("28-3",
              "เพิ่ม Foreign Key ให้ employees.department_id อ้างอิง departments.department_id",
              "ALTER TABLE employees ADD CONSTRAINT fk_emp_dept FOREIGN KEY (department_id) REFERENCES departments(department_id);",
              "ALTER TABLE ใช้เพิ่ม Constraint ให้ตารางที่มีอยู่แล้ว"),

            Q("28-4",
              "อธิบาย ON DELETE RESTRICT",
              "ON DELETE RESTRICT ป้องกันการลบแถวในตารางแม่หากยังมีแถวในตารางลูกอ้างอิงอยู่",
              "ช่วยป้องกันข้อมูลอ้างอิงสูญหาย"),

            Q("28-5",
              "อธิบายความแตกต่างระหว่าง ON DELETE CASCADE และ ON DELETE SET NULL",
              "CASCADE ลบแถวลูกที่อ้างอิงตามแถวแม่ ส่วน SET NULL กำหนด Foreign Key ของแถวลูกเป็น NULL",
              "SET NULL ต้องใช้กับคอลัมน์ที่อนุญาตให้เป็น NULL")
        ]),

        // ==================================================
        // 29. DDL
        // ==================================================
        G(29, "Data Definition Language",
        "CREATE, ALTER, RENAME และ DROP", [

            Q("29-1",
              "สร้างฐานข้อมูลชื่อ exam_db",
              "CREATE DATABASE exam_db;",
              "CREATE DATABASE ใช้สร้างฐานข้อมูล"),

            Q("29-2",
              "สร้างตาราง categories ที่มี id เป็น Primary Key และ category_name เป็น VARCHAR(100)",
              "CREATE TABLE categories (id INT PRIMARY KEY, category_name VARCHAR(100));",
              "CREATE TABLE ใช้สร้างโครงสร้างตาราง"),

            Q("29-3",
              "เพิ่มคอลัมน์ phone VARCHAR(20) ในตาราง customers",
              "ALTER TABLE customers ADD COLUMN phone VARCHAR(20);",
              "ALTER TABLE ADD COLUMN ใช้เพิ่มคอลัมน์"),

            Q("29-4",
              "เปลี่ยนชื่อตาราง customers เป็น clients",
              "RENAME TABLE customers TO clients;",
              "RENAME TABLE ใช้เปลี่ยนชื่อตาราง"),

            Q("29-5",
              "ลบตาราง temp_data เฉพาะกรณีที่ตารางมีอยู่",
              "DROP TABLE IF EXISTS temp_data;",
              "IF EXISTS ช่วยหลีกเลี่ยงข้อผิดพลาดเมื่อไม่มีตาราง")
        ]),

        // ==================================================
        // 30. DATA TYPES
        // ==================================================
        G(30, "ชนิดข้อมูลใน MySQL",
        "Numeric, String, Date และ Boolean", [

            Q("30-1",
              "ควรใช้ชนิดข้อมูลใดเก็บจำนวนสินค้าเป็นจำนวนเต็ม",
              "INT",
              "INT เหมาะสำหรับจำนวนเต็มภายในช่วงที่รองรับ"),

            Q("30-2",
              "ควรใช้ชนิดข้อมูลใดเก็บราคาสินค้าให้แม่นยำถึงทศนิยม 2 ตำแหน่ง",
              "DECIMAL(10,2)",
              "DECIMAL เหมาะสำหรับข้อมูลการเงินที่ต้องการความแม่นยำแบบฐานสิบ"),

            Q("30-3",
              "อธิบายความแตกต่างระหว่าง CHAR และ VARCHAR",
              "CHAR เป็นข้อความความยาวคงที่ ส่วน VARCHAR เป็นข้อความความยาวแปรผัน",
              "เลือกใช้ตามลักษณะข้อมูลและความยาวที่ต้องการ"),

            Q("30-4",
              "ควรใช้ชนิดข้อมูลใดเก็บวันที่และเวลาที่ไม่มีข้อมูล Time Zone ในค่า",
              "DATETIME",
              "DATETIME เก็บวันที่และเวลาโดยไม่แปลงตาม Time Zone ของ Session"),

            Q("30-5",
              "MySQL ใช้ชนิดข้อมูลใดแทน BOOLEAN และค่า TRUE/FALSE เก็บเป็นค่าอะไร",
              "BOOLEAN เป็นคำพ้องของ TINYINT(1) โดย TRUE แทนค่า 1 และ FALSE แทนค่า 0",
              "TINYINT(1) ไม่ได้บังคับว่าต้องเก็บเพียง 0 หรือ 1")
        ]),

        // ==================================================
        // 31. NORMALIZATION
        // ==================================================
        G(31, "Database Normalization",
        "1NF, 2NF และ 3NF", [

            Q("31-1",
              "Normalization คืออะไร",
              "กระบวนการออกแบบตารางฐานข้อมูลเพื่อลดความซ้ำซ้อนและลดปัญหาความผิดปกติในการเพิ่ม แก้ไข และลบข้อมูล",
              "Normalization ช่วยปรับปรุงโครงสร้างและความสอดคล้องของข้อมูล"),

            Q("31-2",
              "อธิบายหลักการ First Normal Form (1NF)",
              "แต่ละช่องข้อมูลควรเก็บค่าเดียวตามโดเมนที่กำหนด และไม่มีกลุ่มข้อมูลที่ซ้ำเป็นชุดภายในแถว",
              "1NF ช่วยจัดข้อมูลให้อยู่ในรูปแบบตารางเชิงสัมพันธ์"),

            Q("31-3",
              "อธิบายหลักการ Second Normal Form (2NF)",
              "ต้องอยู่ใน 1NF และไม่มี Non-key Attribute ที่ขึ้นต่อเพียงบางส่วนของ Candidate Key แบบประกอบ",
              "2NF ช่วยลด Partial Dependency"),

            Q("31-4",
              "อธิบายหลักการ Third Normal Form (3NF)",
              "ต้องอยู่ใน 2NF และลดการพึ่งพาแบบ Transitive ของ Non-key Attribute ต่อคีย์ โดยทุก Functional Dependency ที่ไม่เป็น Trivial ต้องมี Determinant เป็น Superkey หรือ Dependent เป็น Prime Attribute",
              "3NF ช่วยลดความซ้ำซ้อนจาก Functional Dependency"),

            Q("31-5",
              "หากตาราง orders เก็บ customer_id และ customer_address ซ้ำทุกคำสั่งซื้อ ควรปรับโครงสร้างอย่างไร",
              "แยกข้อมูลลูกค้าไปยังตาราง customers และเก็บ customer_id ใน orders เพื่ออ้างอิงข้อมูลลูกค้า",
              "ช่วยลดข้อมูลที่ซ้ำและลด Update Anomaly")
        ]),

        // ==================================================
        // 32. ER DIAGRAM
        // ==================================================
        G(32, "Entity Relationship Diagram",
        "Entity, Attribute และ Cardinality", [

            Q("32-1",
              "Entity ใน ER Diagram หมายถึงอะไร",
              "สิ่งหรือวัตถุที่ต้องการจัดเก็บข้อมูล เช่น Employee, Department หรือ Product",
              "Entity ใช้แทนกลุ่มข้อมูลที่มีคุณสมบัติร่วมกัน"),

            Q("32-2",
              "Attribute หมายถึงอะไร",
              "คุณสมบัติของ Entity เช่น employee_id, employee_name และ salary",
              "Attribute อธิบายรายละเอียดของ Entity"),

            Q("32-3",
              "ความสัมพันธ์ One-to-Many หมายถึงอะไร",
              "ข้อมูลหนึ่งรายการใน Entity ฝั่งหนึ่งสัมพันธ์กับหลายรายการในอีก Entity หนึ่งได้",
              "ตัวอย่างคือแผนกหนึ่งมีพนักงานหลายคน"),

            Q("32-4",
              "ความสัมพันธ์ Many-to-Many ระหว่าง students และ courses ควรออกแบบอย่างไร",
              "สร้างตารางกลาง enrollments ที่มี student_id และ course_id เป็น Foreign Key",
              "ตารางกลางใช้แยก Many-to-Many ออกเป็นความสัมพันธ์ One-to-Many"),

            Q("32-5",
              "Cardinality ใน ER Diagram ใช้บอกอะไร",
              "ใช้แสดงจำนวนความสัมพันธ์ที่เป็นไปได้ระหว่าง Entity เช่น One-to-One, One-to-Many และ Many-to-Many",
              "Cardinality เป็นส่วนสำคัญในการออกแบบความสัมพันธ์")
        ]),

        // ==================================================
        // 33. VIEWS
        // ==================================================
        G(33, "Views ใน MySQL",
        "CREATE VIEW และการจัดการ View", [

            Q("33-1",
              "สร้าง View ชื่อ active_employees เพื่อแสดงพนักงานที่ status เป็น active",
              "CREATE VIEW active_employees AS SELECT * FROM employees WHERE status = 'active';",
              "VIEW เป็นตารางเสมือนที่กำหนดจาก Query"),

            Q("33-2",
              "แสดงข้อมูลทั้งหมดจาก View active_employees",
              "SELECT * FROM active_employees;",
              "สามารถ Query View ได้คล้ายตารางทั่วไป"),

            Q("33-3",
              "เปลี่ยนนิยาม View active_employees ให้แสดงเฉพาะ id และ name ของพนักงาน active",
              "CREATE OR REPLACE VIEW active_employees AS SELECT id, name FROM employees WHERE status = 'active';",
              "CREATE OR REPLACE VIEW ใช้สร้างหรือแทนที่นิยาม View"),

            Q("33-4",
              "ลบ View ชื่อ active_employees",
              "DROP VIEW active_employees;",
              "DROP VIEW ลบเฉพาะ View ไม่ได้ลบตารางต้นทาง"),

            Q("33-5",
              "View ใน MySQL สามารถ UPDATE ได้ทุกกรณีหรือไม่",
              "ไม่ได้ เพราะ View บางรูปแบบ เช่น View ที่มี GROUP BY หรือ Aggregate Function ไม่สามารถแก้ไขข้อมูลผ่าน View ได้โดยตรง",
              "ความสามารถในการ UPDATE ขึ้นอยู่กับนิยามของ View")
        ]),

        // ==================================================
        // 34. INDEX
        // ==================================================
        G(34, "Index และ Query Optimization",
        "CREATE INDEX, Composite Index และ EXPLAIN", [

            Q("34-1",
              "สร้าง Index ชื่อ idx_email บนคอลัมน์ email ของตาราง users",
              "CREATE INDEX idx_email ON users(email);",
              "Index ช่วยให้การค้นหาบางรูปแบบทำงานได้เร็วขึ้น"),

            Q("34-2",
              "สร้าง Composite Index บน department_id และ salary ของ employees",
              "CREATE INDEX idx_department_salary ON employees(department_id, salary);",
              "Composite Index สามารถช่วย Query ที่ใช้คอลัมน์นำหน้าของ Index"),

            Q("34-3",
              "ลบ Index ชื่อ idx_email จากตาราง users",
              "DROP INDEX idx_email ON users;",
              "DROP INDEX ใช้ลบดัชนีที่ไม่ต้องการ"),

            Q("34-4",
              "ใช้ EXPLAIN เพื่อตรวจสอบ Query ที่ค้นหาพนักงานแผนก IT",
              "EXPLAIN SELECT * FROM employees WHERE department = 'IT';",
              "EXPLAIN แสดงแผนการทำงานที่ Optimizer เลือกใช้"),

            Q("34-5",
              "เหตุใดการสร้าง Index จำนวนมากจึงอาจทำให้ระบบช้าลง",
              "เพราะ Index ใช้พื้นที่จัดเก็บและเพิ่มต้นทุนการบำรุงรักษาเมื่อ INSERT, UPDATE หรือ DELETE ข้อมูล",
              "ควรเลือก Index จากรูปแบบ Query และข้อมูลจริง")
        ]),

        // ==================================================
        // 35. STORED PROCEDURES
        // ==================================================
        G(35, "Stored Procedures",
        "การสร้างและเรียกใช้ Procedure", [

            Q("35-1",
              "Stored Procedure คืออะไร",
              "ชุดคำสั่ง SQL ที่จัดเก็บไว้ในฐานข้อมูลและสามารถเรียกใช้งานซ้ำได้",
              "Stored Procedure ช่วยรวมขั้นตอนการทำงานไว้ในฐานข้อมูล"),

            Q("35-2",
              "สร้าง Procedure ชื่อ GetEmployees เพื่อแสดงข้อมูลพนักงานทั้งหมด",
              "CREATE PROCEDURE GetEmployees() SELECT * FROM employees;",
              "CREATE PROCEDURE ใช้สร้าง Stored Procedure"),

            Q("35-3",
              "เรียกใช้ Procedure ชื่อ GetEmployees",
              "CALL GetEmployees();",
              "CALL ใช้เรียก Stored Procedure"),

            Q("35-4",
              "ลบ Procedure ชื่อ GetEmployees",
              "DROP PROCEDURE IF EXISTS GetEmployees;",
              "DROP PROCEDURE ใช้ลบ Stored Procedure"),

            Q("35-5",
              "สร้าง Procedure ชื่อ GetEmployeeById ที่รับ IN parameter p_id และค้นหาพนักงานตาม id",
              "CREATE PROCEDURE GetEmployeeById(IN p_id INT) SELECT * FROM employees WHERE id = p_id;",
              "IN Parameter ใช้ส่งค่าจากผู้เรียกเข้าสู่ Procedure")
        ]),

        // ==================================================
        // 36. STORED FUNCTIONS
        // ==================================================
        G(36, "Stored Functions",
        "การสร้าง Function ใน MySQL", [

            Q("36-1",
              "Stored Function แตกต่างจาก Stored Procedure อย่างไร",
              "Stored Function คืนค่าผ่าน RETURN และสามารถใช้ใน Expression ตามข้อจำกัดของ MySQL ส่วน Stored Procedure เรียกด้วย CALL และสามารถใช้ OUT Parameter ได้",
              "ทั้งสองเป็น Stored Program แต่มีวิธีเรียกและข้อจำกัดต่างกัน"),

            Q("36-2",
              "สร้าง Function ชื่อ AddNumbers รับจำนวนเต็มสองค่าและคืนค่าผลรวม โดยกำหนด DETERMINISTIC",
              "CREATE FUNCTION AddNumbers(a INT, b INT) RETURNS INT DETERMINISTIC RETURN a + b;",
              "DETERMINISTIC ระบุว่าค่าอินพุตเดิมให้ผลลัพธ์เดิม"),

            Q("36-3",
              "เรียกใช้ Function AddNumbers เพื่อบวก 10 กับ 20",
              "SELECT AddNumbers(10, 20);",
              "Stored Function สามารถใช้ภายใน SELECT"),

            Q("36-4",
              "ลบ Function ชื่อ AddNumbers",
              "DROP FUNCTION IF EXISTS AddNumbers;",
              "DROP FUNCTION ใช้ลบ Stored Function"),

            Q("36-5",
              "คำสั่ง RETURN ใน Stored Function มีหน้าที่อะไร",
              "ใช้คืนค่าผลลัพธ์จาก Function และสิ้นสุดการทำงานของ Function",
              "Stored Function ต้องกำหนดชนิดข้อมูลผลลัพธ์ด้วย RETURNS")
        ]),

        // ==================================================
        // 37. TRIGGERS
        // ==================================================
        G(37, "Triggers ใน MySQL",
        "BEFORE และ AFTER Trigger", [

            Q("37-1",
              "Trigger คืออะไร",
              "Stored Program ที่ทำงานอัตโนมัติเมื่อเกิด INSERT, UPDATE หรือ DELETE บนตารางที่กำหนด",
              "Trigger ใช้จัดการเหตุการณ์ที่เกิดกับข้อมูล"),

            Q("37-2",
              "สร้าง Trigger ก่อน INSERT ลง employees เพื่อกำหนด salary ที่เป็น NULL ให้เป็น 0",
              "CREATE TRIGGER trg_salary BEFORE INSERT ON employees FOR EACH ROW SET NEW.salary = COALESCE(NEW.salary, 0);",
              "BEFORE INSERT ทำงานก่อนบันทึกแถวใหม่"),

            Q("37-3",
              "NEW และ OLD ใน Trigger หมายถึงอะไร",
              "NEW อ้างอิงค่าแถวใหม่ ส่วน OLD อ้างอิงค่าแถวเดิม โดยความพร้อมใช้งานขึ้นอยู่กับเหตุการณ์ INSERT, UPDATE หรือ DELETE",
              "INSERT ใช้ NEW, DELETE ใช้ OLD และ UPDATE ใช้ได้ทั้งสอง"),

            Q("37-4",
              "ลบ Trigger ชื่อ trg_salary",
              "DROP TRIGGER IF EXISTS trg_salary;",
              "DROP TRIGGER ใช้ลบ Trigger"),

            Q("37-5",
              "อธิบายความแตกต่างระหว่าง BEFORE UPDATE และ AFTER UPDATE",
              "BEFORE UPDATE ทำงานก่อนปรับข้อมูลแถว ส่วน AFTER UPDATE ทำงานหลังการปรับข้อมูลแถว",
              "เลือกใช้ตามลำดับการทำงานที่ต้องการ")
        ]),

        // ==================================================
        // 38. CTE
        // ==================================================
        G(38, "Common Table Expressions",
        "WITH และ Recursive CTE", [

            Q("38-1",
              "CTE คืออะไร",
              "Common Table Expression คือผลลัพธ์ชั่วคราวที่ตั้งชื่อไว้ภายในขอบเขตของคำสั่ง SQL โดยประกาศด้วย WITH",
              "CTE ช่วยแบ่ง Query ที่ซับซ้อนให้อ่านง่ายขึ้น"),

            Q("38-2",
              "ใช้ CTE ชื่อ high_salary เพื่อค้นหาพนักงานที่ salary มากกว่า 50000",
              "WITH high_salary AS (SELECT * FROM employees WHERE salary > 50000) SELECT * FROM high_salary;",
              "WITH ใช้กำหนด CTE และ Query หลักเรียกใช้ชื่อ CTE"),

            Q("38-3",
              "สร้าง CTE ชื่อ dept_count เพื่อแสดงจำนวนพนักงานแต่ละ department_id",
              "WITH dept_count AS (SELECT department_id, COUNT(*) AS total FROM employees GROUP BY department_id) SELECT * FROM dept_count;",
              "สามารถใช้ Aggregate Function ภายใน CTE"),

            Q("38-4",
              "Recursive CTE มีวัตถุประสงค์เพื่ออะไร",
              "ใช้ Query ข้อมูลที่มีโครงสร้างแบบลำดับชั้นหรือทำงานแบบวนซ้ำ โดยมีส่วนเริ่มต้นและส่วน Recursive",
              "ตัวอย่างการใช้งานคือโครงสร้างพนักงานและหัวหน้างาน"),

            Q("38-5",
              "เขียน Recursive CTE เพื่อสร้างตัวเลขตั้งแต่ 1 ถึง 5",
              "WITH RECURSIVE nums AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM nums WHERE n < 5) SELECT n FROM nums;",
              "Recursive CTE ใช้ UNION ALL เชื่อมส่วนเริ่มต้นกับส่วน Recursive")
        ]),

        // ==================================================
        // 39. WINDOW FUNCTIONS
        // ==================================================
        G(39, "Window Functions",
        "ROW_NUMBER, RANK และ DENSE_RANK", [

            Q("39-1",
              "ใช้ ROW_NUMBER จัดลำดับพนักงานตามเงินเดือนจากมากไปน้อย",
              "SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM employees;",
              "ROW_NUMBER กำหนดหมายเลขแถวไม่ซ้ำตามลำดับที่ระบุ"),

            Q("39-2",
              "ใช้ RANK จัดอันดับพนักงานตามเงินเดือนจากมากไปน้อย",
              "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS salary_rank FROM employees;",
              "RANK ให้ลำดับเท่ากันเมื่อค่าเท่ากัน และข้ามอันดับถัดไป"),

            Q("39-3",
              "ใช้ DENSE_RANK จัดอันดับพนักงานตามเงินเดือนจากมากไปน้อย",
              "SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank FROM employees;",
              "DENSE_RANK ไม่ข้ามอันดับเมื่อพบค่าที่เท่ากัน"),

            Q("39-4",
              "ใช้ ROW_NUMBER จัดลำดับเงินเดือนพนักงานแยกตาม department_id",
              "SELECT name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn FROM employees;",
              "PARTITION BY แบ่งกลุ่มการคำนวณของ Window Function"),

            Q("39-5",
              "ใช้ SUM แบบ Window Function แสดงยอดเงินเดือนรวมในแต่ละแผนกโดยยังคงทุกแถว",
              "SELECT name, department_id, salary, SUM(salary) OVER (PARTITION BY department_id) AS department_total FROM employees;",
              "Window Function คำนวณค่ารวมโดยไม่ยุบแถวเหมือน GROUP BY")
        ]),

        // ==================================================
        // 40. JSON
        // ==================================================
        G(40, "JSON Data ใน MySQL",
        "JSON_EXTRACT, JSON_OBJECT และ JSON_ARRAY", [

            Q("40-1",
              "สร้างตาราง events ที่มี id เป็น Primary Key และ payload เป็นชนิด JSON",
              "CREATE TABLE events (id INT PRIMARY KEY, payload JSON);",
              "MySQL รองรับชนิดข้อมูล JSON สำหรับข้อมูลที่มีโครงสร้าง"),

            Q("40-2",
              "สร้าง JSON Object ที่มี name เป็น Somchai และ age เป็น 30",
              "SELECT JSON_OBJECT('name', 'Somchai', 'age', 30);",
              "JSON_OBJECT ใช้สร้าง JSON Object"),

            Q("40-3",
              "สร้าง JSON Array ที่ประกอบด้วย IT, HR และ Finance",
              "SELECT JSON_ARRAY('IT', 'HR', 'Finance');",
              "JSON_ARRAY ใช้สร้าง JSON Array"),

            Q("40-4",
              "ดึงค่า name จาก JSON คอลัมน์ payload ในตาราง events",
              "SELECT JSON_EXTRACT(payload, '$.name') FROM events;",
              "JSON_EXTRACT ใช้ดึงข้อมูลตาม JSON Path"),

            Q("40-5",
              "ตรวจสอบว่า JSON คอลัมน์ payload มี Path $.name หรือไม่",
              "SELECT JSON_CONTAINS_PATH(payload, 'one', '$.name') FROM events;",
              "JSON_CONTAINS_PATH ใช้ตรวจสอบการมีอยู่ของ Path")
        ]),

        // ==================================================
        // 41. SET OPERATIONS
        // ==================================================
        G(41, "Set Operations",
        "UNION, UNION ALL, INTERSECT และ EXCEPT", [

            Q("41-1",
              "รวมรายชื่อจาก employees และ customers โดยไม่ให้ชื่อซ้ำกัน",
              "SELECT name FROM employees UNION SELECT name FROM customers;",
              "UNION รวมผลลัพธ์และตัดแถวซ้ำ"),

            Q("41-2",
              "รวมรายชื่อจาก employees และ customers โดยเก็บแถวซ้ำไว้",
              "SELECT name FROM employees UNION ALL SELECT name FROM customers;",
              "UNION ALL ไม่ตัดแถวซ้ำ"),

            Q("41-3",
              "อธิบายความแตกต่างระหว่าง UNION และ UNION ALL",
              "UNION ตัดแถวที่ซ้ำกัน ส่วน UNION ALL เก็บแถวซ้ำทั้งหมด",
              "UNION ALL มักมีต้นทุนต่ำกว่าเมื่อไม่ต้องกำจัดแถวซ้ำ"),

            Q("41-4",
              "เขียน SQL เพื่อหาชื่อที่มีอยู่ทั้งใน employees และ customers โดยใช้ INTERSECT บน MySQL 8.0.31 ขึ้นไป",
              "SELECT name FROM employees INTERSECT SELECT name FROM customers;",
              "INTERSECT คืนค่าที่ปรากฏในผลลัพธ์ทั้งสองชุด"),

            Q("41-5",
              "เขียน SQL เพื่อหาชื่อที่อยู่ใน employees แต่ไม่อยู่ใน customers โดยใช้ EXCEPT บน MySQL 8.0.31 ขึ้นไป",
              "SELECT name FROM employees EXCEPT SELECT name FROM customers;",
              "EXCEPT คืนค่าจากชุดแรกที่ไม่อยู่ในชุดที่สอง")
        ]),

        // ==================================================
        // 42. SUBQUERY ADVANCED
        // ==================================================
        G(42, "Advanced Subqueries",
        "EXISTS, NOT EXISTS, ANY และ ALL", [

            Q("42-1",
              "ค้นหาลูกค้าที่มีคำสั่งซื้ออย่างน้อยหนึ่งรายการโดยใช้ EXISTS",
              "SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
              "EXISTS ตรวจสอบว่ามีแถวที่ตรงเงื่อนไขหรือไม่"),

            Q("42-2",
              "ค้นหาลูกค้าที่ไม่มีคำสั่งซื้อโดยใช้ NOT EXISTS",
              "SELECT * FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
              "NOT EXISTS ใช้ค้นหากรณีไม่มีแถวที่ตรงเงื่อนไข"),

            Q("42-3",
              "ค้นหาพนักงานที่เงินเดือนสูงกว่าเงินเดือนอย่างน้อยหนึ่งคนในแผนก 1 โดยใช้ ANY",
              "SELECT * FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 1);",
              "ANY หมายถึงเงื่อนไขเป็นจริงกับค่าอย่างน้อยหนึ่งค่าที่ Subquery คืนมา"),

            Q("42-4",
              "ค้นหาพนักงานที่เงินเดือนสูงกว่าเงินเดือนทุกคนในแผนก 1 โดยใช้ ALL",
              "SELECT * FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 1);",
              "ALL กำหนดให้เงื่อนไขเป็นจริงกับทุกค่าจาก Subquery"),

            Q("42-5",
              "อธิบายความแตกต่างระหว่าง EXISTS และ IN",
              "EXISTS ตรวจสอบการมีอยู่ของแถวใน Subquery ส่วน IN ตรวจสอบว่าค่าตรงกับค่าใดในชุดผลลัพธ์หรือไม่",
              "ทั้งสองสามารถใช้แก้ปัญหาบางประเภทเหมือนกัน แต่มี Semantics และพฤติกรรมกับ NULL ที่ต้องพิจารณา")
        ]),

        // ==================================================
        // 43. STRING FUNCTIONS
        // ==================================================
        G(43, "Advanced String Functions",
        "SUBSTRING, REPLACE, LENGTH และ LOCATE", [

            Q("43-1",
              "ดึงอักขระ 3 ตัวแรกจาก username",
              "SELECT SUBSTRING(username, 1, 3) FROM users;",
              "SUBSTRING ใช้ดึงข้อความบางส่วน"),

            Q("43-2",
              "แทนที่คำว่า old ด้วย new ในคอลัมน์ description",
              "SELECT REPLACE(description, 'old', 'new') FROM products;",
              "REPLACE ใช้แทนที่ข้อความภายใน String"),

            Q("43-3",
              "หาจำนวน Byte ของ username",
              "SELECT LENGTH(username) FROM users;",
              "LENGTH คืนจำนวน Byte ไม่ใช่จำนวนตัวอักษร"),

            Q("43-4",
              "หาจำนวนตัวอักษรของ username",
              "SELECT CHAR_LENGTH(username) FROM users;",
              "CHAR_LENGTH คืนจำนวนตัวอักษร"),

            Q("43-5",
              "ค้นหาตำแหน่งคำว่า admin ภายใน username",
              "SELECT LOCATE('admin', username) FROM users;",
              "LOCATE คืนตำแหน่งเริ่มต้น โดยคืน 0 เมื่อไม่พบ")
        ]),

        // ==================================================
        // 44. DATE FUNCTIONS
        // ==================================================
        G(44, "Advanced Date and Time Functions",
        "DATEDIFF, DATE_ADD, TIMESTAMPDIFF และ DATE_FORMAT", [

            Q("44-1",
              "แสดงวันที่ปัจจุบัน",
              "SELECT CURDATE();",
              "CURDATE คืนวันที่ปัจจุบัน"),

            Q("44-2",
              "เพิ่ม 7 วันจากวันที่ปัจจุบัน",
              "SELECT DATE_ADD(CURDATE(), INTERVAL 7 DAY);",
              "DATE_ADD ใช้เพิ่มช่วงเวลาให้วันที่"),

            Q("44-3",
              "คำนวณจำนวนวันระหว่างวันที่ 2025-01-01 และ 2025-01-10",
              "SELECT DATEDIFF('2025-01-10', '2025-01-01');",
              "DATEDIFF คืนผลต่างของวันที่ โดยไม่คำนึงถึงส่วนเวลา"),

            Q("44-4",
              "คำนวณอายุเป็นจำนวนปีเต็มจาก birth_date ในตาราง employees",
              "SELECT TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age FROM employees;",
              "TIMESTAMPDIFF คำนวณผลต่างตามหน่วยเวลาที่ระบุ"),

            Q("44-5",
              "แสดง order_date ในรูปแบบ YYYY-MM-DD",
              "SELECT DATE_FORMAT(order_date, '%Y-%m-%d') FROM orders;",
              "DATE_FORMAT ใช้จัดรูปแบบวันที่และเวลา")
        ]),

        // ==================================================
        // 45. USER MANAGEMENT
        // ==================================================
        G(45, "MySQL Users and Privileges",
        "CREATE USER, GRANT และ REVOKE", [

            Q("45-1",
              "สร้างผู้ใช้ MySQL ชื่อ exam_user ที่เชื่อมต่อจาก localhost พร้อมรหัสผ่านตัวอย่าง",
              "CREATE USER 'exam_user'@'localhost' IDENTIFIED BY 'ExampleStrongPassword_123!';",
              "CREATE USER ใช้สร้างบัญชีผู้ใช้ MySQL ควรใช้รหัสผ่านที่ปลอดภัยและไม่ใช้รหัสตัวอย่างจริง"),

            Q("45-2",
              "ให้สิทธิ์ SELECT บนทุกตารางใน exam_db แก่ exam_user ที่ localhost",
              "GRANT SELECT ON exam_db.* TO 'exam_user'@'localhost';",
              "GRANT ใช้มอบสิทธิ์ให้ผู้ใช้"),

            Q("45-3",
              "ยกเลิกสิทธิ์ SELECT บน exam_db จาก exam_user",
              "REVOKE SELECT ON exam_db.* FROM 'exam_user'@'localhost';",
              "REVOKE ใช้ถอนสิทธิ์ที่เคยมอบให้"),

            Q("45-4",
              "แสดงสิทธิ์ของ exam_user ที่ localhost",
              "SHOW GRANTS FOR 'exam_user'@'localhost';",
              "SHOW GRANTS ใช้ตรวจสอบสิทธิ์ของบัญชี"),

            Q("45-5",
              "อธิบายหลัก Least Privilege",
              "กำหนดสิทธิ์ให้ผู้ใช้หรือระบบเท่าที่จำเป็นต่อการปฏิบัติงานเท่านั้น",
              "ช่วยลดผลกระทบหากบัญชีถูกใช้งานผิดวัตถุประสงค์")
        ]),

        // ==================================================
        // 46. SECURITY
        // ==================================================
        G(46, "Database Security และ SQL Injection",
        "Prepared Statements และการรักษาความปลอดภัย", [

            Q("46-1",
              "SQL Injection คืออะไร",
              "ช่องโหว่ที่เกิดจากการนำข้อมูลที่ผู้ใช้ควบคุมได้ไปประกอบเป็นคำสั่ง SQL อย่างไม่ปลอดภัย จนอาจเปลี่ยนความหมายของ Query",
              "ควรใช้ Parameterized Query เพื่อแยกข้อมูลออกจากโครงสร้าง SQL"),

            Q("46-2",
              "เขียนตัวอย่าง PHP PDO Prepared Statement เพื่อค้นหาผู้ใช้ตาม id",
              "$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?'); $stmt->execute([$id]);",
              "Prepared Statement ช่วยลดความเสี่ยง SQL Injection เมื่อ Bind ค่าข้อมูลอย่างถูกต้อง"),

            Q("46-3",
              "เหตุใดไม่ควรนำค่าจากผู้ใช้มาต่อ String เป็น SQL โดยตรง",
              "เพราะข้อมูลที่ผู้ใช้ส่งมาอาจเปลี่ยนโครงสร้างหรือเงื่อนไขของคำสั่ง SQL และทำให้เกิด SQL Injection",
              "ควรใช้ Bind Parameters สำหรับค่าข้อมูล"),

            Q("46-4",
              "อธิบายเหตุผลที่ไม่ควรใช้บัญชี root เชื่อมต่อฐานข้อมูลจากเว็บไซต์",
              "เพราะ root มีสิทธิ์สูงเกินความจำเป็น หากเว็บไซต์ถูกโจมตีอาจส่งผลกระทบต่อฐานข้อมูลทั้งระบบ",
              "ควรสร้างบัญชีเฉพาะแอปพลิเคชันตาม Least Privilege"),

            Q("46-5",
              "เหตุใดการเข้ารหัส TLS จึงสำคัญต่อการเชื่อมต่อ MySQL ผ่านเครือข่าย",
              "TLS ช่วยเข้ารหัสข้อมูลระหว่าง Client และ Server และช่วยยืนยันตัวตน Server เมื่อกำหนดการตรวจสอบใบรับรองอย่างเหมาะสม",
              "ช่วยลดความเสี่ยงการดักฟังและการโจมตีระหว่างทาง")
        ]),

        // ==================================================
        // 47. BACKUP
        // ==================================================
        G(47, "Database Backup and Recovery",
        "mysqldump, Restore และ Binary Log", [

            Q("47-1",
              "เขียนคำสั่ง mysqldump เพื่อสำรองฐานข้อมูล exam_db เป็นไฟล์ exam_db.sql",
              "mysqldump -u root -p exam_db > exam_db.sql",
              "mysqldump เป็นโปรแกรม Command Line สำหรับสำรองข้อมูล ไม่ใช่คำสั่ง SQL"),

            Q("47-2",
              "เขียนคำสั่งนำไฟล์ exam_db.sql กลับเข้าสู่ฐานข้อมูล exam_db",
              "mysql -u root -p exam_db < exam_db.sql",
              "คำสั่ง mysql ใช้นำเข้า SQL Dump โดยฐานข้อมูลปลายทางต้องมีอยู่ก่อนตามตัวอย่าง"),

            Q("47-3",
              "Full Backup หมายถึงอะไร",
              "การสำรองข้อมูลทั้งหมดภายในขอบเขตที่กำหนด ณ เวลาที่สำรอง",
              "Full Backup ใช้เป็นจุดเริ่มต้นในการกู้คืนข้อมูล"),

            Q("47-4",
              "Binary Log ของ MySQL มีประโยชน์อย่างไร",
              "ใช้บันทึกเหตุการณ์เปลี่ยนแปลงข้อมูลเพื่อรองรับ Replication และการกู้คืนแบบ Point-in-Time เมื่อมี Backup และ Log ที่เหมาะสม",
              "Binary Log มีบทบาทสำคัญต่อการกู้คืนและ Replication"),

            Q("47-5",
              "เหตุใดต้องทดสอบ Restore หลังทำ Backup",
              "เพื่อยืนยันว่าไฟล์สำรองสามารถนำกลับมาใช้ได้จริงและข้อมูลที่กู้คืนมีความครบถ้วนตามที่ต้องการ",
              "Backup ที่ไม่เคยทดสอบ Restore อาจไม่เพียงพอต่อแผนกู้คืนระบบ")
        ]),

        // ==================================================
        // 48. PERFORMANCE
        // ==================================================
        G(48, "Query Performance",
        "EXPLAIN ANALYZE และการปรับปรุง Query", [

            Q("48-1",
              "ใช้ EXPLAIN ANALYZE ตรวจสอบ Query ที่ค้นหาพนักงาน id = 10 บน MySQL 8.0.18 ขึ้นไป",
              "EXPLAIN ANALYZE SELECT * FROM employees WHERE id = 10;",
              "EXPLAIN ANALYZE รัน Query และรายงานข้อมูลการทำงานจริง จึงต้องระวังกับคำสั่งที่เปลี่ยนข้อมูล"),

            Q("48-2",
              "Full Table Scan คืออะไร",
              "การอ่านข้อมูลจากตารางจำนวนมากหรือทั้งตารางเพื่อประเมินเงื่อนไขของ Query",
              "Full Table Scan อาจเหมาะสมกับตารางขนาดเล็กหรือ Query บางรูปแบบ"),

            Q("48-3",
              "เหตุใด SELECT * จึงอาจมีประสิทธิภาพต่ำกว่าการเลือกเฉพาะคอลัมน์ที่ต้องการ",
              "เพราะอาจอ่านและส่งข้อมูลมากเกินความจำเป็น รวมถึงอาจลดโอกาสใช้ Covering Index",
              "ควรเลือกเฉพาะคอลัมน์ที่ต้องใช้งานจริง"),

            Q("48-4",
              "เหตุใดการใช้ WHERE YEAR(order_date) = 2025 อาจทำให้ใช้ Index แบบปกติได้ไม่เต็มประสิทธิภาพ",
              "เพราะการใช้ Function กับคอลัมน์อาจทำให้ Range Scan บน Index ของคอลัมน์เดิมทำได้ยากขึ้น",
              "สามารถใช้เงื่อนไขช่วงวันที่แทนได้เมื่อเหมาะสม"),

            Q("48-5",
              "เขียน SQL ค้นหาคำสั่งซื้อทั้งหมดในปี 2025 โดยใช้เงื่อนไขช่วงวันที่",
              "SELECT * FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';",
              "การใช้ช่วงวันที่ช่วยให้ Optimizer มีโอกาสใช้ Range Index Scan")
        ]),

        // ==================================================
        // 49. DATABASE DESIGN SCENARIO
        // ==================================================
        G(49, "Database Design Scenario",
        "การออกแบบฐานข้อมูลระบบจองห้องประชุม", [

            Q("49-1",
              "สร้างตาราง meeting_rooms ที่มี id เป็น Primary Key และ room_name เป็น VARCHAR(100) NOT NULL",
              "CREATE TABLE meeting_rooms (id INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(100) NOT NULL);",
              "ใช้ตาราง meeting_rooms สำหรับเก็บข้อมูลห้องประชุม"),

            Q("49-2",
              "สร้างตาราง bookings ที่มี id, room_id, booking_date, start_time และ end_time โดย room_id เป็น Foreign Key",
              "CREATE TABLE bookings (id INT AUTO_INCREMENT PRIMARY KEY, room_id INT NOT NULL, booking_date DATE NOT NULL, start_time TIME NOT NULL, end_time TIME NOT NULL, FOREIGN KEY (room_id) REFERENCES meeting_rooms(id));",
              "Foreign Key ใช้เชื่อมรายการจองกับห้องประชุม"),

            Q("49-3",
              "ค้นหารายการจองของห้อง room_id = 1 ในวันที่ 2025-12-01",
              "SELECT * FROM bookings WHERE room_id = 1 AND booking_date = '2025-12-01';",
              "ใช้ WHERE กรองตามห้องและวันที่"),

            Q("49-4",
              "ตรวจสอบว่าห้อง 1 วันที่ 2025-12-01 มีรายการจองที่ทับซ้อนกับช่วง 09:00 ถึง 10:00 หรือไม่ โดยสมมติว่าใช้ช่วงเวลาแบบต้นรวมปลายไม่รวม",
              "SELECT * FROM bookings WHERE room_id = 1 AND booking_date = '2025-12-01' AND start_time < '10:00:00' AND end_time > '09:00:00';",
              "ช่วงเวลาทับซ้อนเมื่อเวลาเริ่มเดิมน้อยกว่าเวลาสิ้นสุดใหม่ และเวลาสิ้นสุดเดิมมากกว่าเวลาเริ่มใหม่"),

            Q("49-5",
              "สร้าง Index เพื่อช่วยค้นหารายการจองตาม room_id, booking_date และ start_time",
              "CREATE INDEX idx_booking_schedule ON bookings(room_id, booking_date, start_time);",
              "Composite Index ช่วย Query ตามคอลัมน์นำหน้า ทั้งนี้การป้องกันจองซ้ำจริงต้องจัดการ Concurrent Transactions ด้วย")
        ]),

        // ==================================================
        // 50. COMPREHENSIVE SQL
        // ==================================================
        G(50, "Comprehensive MySQL Examination",
        "ข้อสอบ SQL ประยุกต์ระดับกลางถึงสูง", [

            Q("50-1",
              "ค้นหาพนักงานที่มีเงินเดือนสูงเป็นอันดับ 2 แบบไม่ซ้ำ โดยใช้ DENSE_RANK",
              "WITH ranked AS (SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk FROM employees) SELECT name, salary FROM ranked WHERE rnk = 2;",
              "DENSE_RANK จัดอันดับโดยไม่ข้ามอันดับเมื่อเงินเดือนเท่ากัน"),

            Q("50-2",
              "แสดงแผนกที่มีเงินเดือนเฉลี่ยสูงกว่าเงินเดือนเฉลี่ยของพนักงานทั้งหมด",
              "SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id HAVING AVG(salary) > (SELECT AVG(salary) FROM employees);",
              "ใช้ GROUP BY, HAVING และ Subquery ร่วมกัน"),

            Q("50-3",
              "ค้นหาลูกค้าที่มียอดสั่งซื้อรวมมากกว่า 100000 บาท โดยใช้ JOIN และ HAVING",
              "SELECT c.id, c.customer_name, SUM(o.total_amount) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.customer_name HAVING SUM(o.total_amount) > 100000;",
              "ใช้ JOIN เชื่อมตาราง และ SUM รวมยอดสั่งซื้อ"),

            Q("50-4",
              "ค้นหาสินค้าที่ไม่เคยถูกสั่งซื้อ โดย products มี id และ order_items มี product_id",
              "SELECT p.* FROM products p WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id);",
              "NOT EXISTS ใช้ค้นหาข้อมูลที่ไม่มีแถวอ้างอิง"),

            Q("50-5",
              "เขียน SQL เพื่อแสดงจำนวนพนักงานและเงินเดือนเฉลี่ยในแต่ละแผนก เรียงตามเงินเดือนเฉลี่ยจากมากไปน้อย",
              "SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS avg_salary FROM employees GROUP BY department_id ORDER BY avg_salary DESC;",
              "ใช้ COUNT, AVG, GROUP BY และ ORDER BY ร่วมกัน")
        ])
    ];

    // ป้องกันการเพิ่มข้อสอบ ID ซ้ำ
    const existingIds = new Set(
        window.QUESTION_BANK.map(group => group.id)
    );

    const duplicates = newQuestions.filter(
        group => existingIds.has(group.id)
    );

    if (duplicates.length > 0) {
        console.warn(
            "มีข้อสอบชุดนี้อยู่แล้ว ไม่เพิ่มซ้ำ:",
            duplicates.map(group => group.id)
        );
        return;
    }

    // เพิ่มข้อสอบใหม่
    window.QUESTION_BANK.push(...newQuestions);

    // ตรวจสอบความครบถ้วน
    const totalGroups = window.QUESTION_BANK.length;

    const totalQuestions = window.QUESTION_BANK.reduce(
        (sum, group) => sum + group.questions.length,
        0
    );

    const allIds = window.QUESTION_BANK.flatMap(
        group => group.questions.map(q => q.id)
    );

    const result = {
        majorQuestions: totalGroups,
        subQuestions: totalQuestions,
        targetMajorQuestions: 55,
        targetSubQuestions: 275,
        allGroupsHaveFive: window.QUESTION_BANK.every(
            group => group.questions.length === 5
        ),
        uniqueIds:
            new Set(allIds).size === allIds.length
    };

    console.log("SQL Practice Exam Question Bank:", result);

})();

/*
|--------------------------------------------------------------------------
| SQL PRACTICE EXAM - QUESTIONS 51-55
|--------------------------------------------------------------------------
| MySQL 8.0+
| 5 ข้อใหญ่ x 5 ข้อย่อย = 25 ข้อย่อย
| คลังข้อสอบรวม 55 ข้อใหญ่ = 275 ข้อย่อย
|--------------------------------------------------------------------------
*/

(function () {
    "use strict";

    if (!Array.isArray(window.QUESTION_BANK)) {
        console.error("ไม่พบ QUESTION_BANK");
        return;
    }

    function Q(id, prompt, answer, explanation) {
        return {
            id: id,
            type: "manual",
            prompt: prompt,
            answer: answer,
            explanation: explanation,
            keywords: []
        };
    }

    function G(id, title, description, questions) {
        return {
            id: id,
            title: title,
            description: description,
            questions: questions
        };
    }

    const newQuestions = [

        // ==================================================
        // 51. SQL ERROR ANALYSIS
        // ==================================================
        G(
            51,
            "SQL Error Analysis",
            "การวิเคราะห์และแก้ไขคำสั่ง SQL ที่ผิดพลาด",
            [
                Q(
                    "51-1",
                    "แก้ไขคำสั่ง SQL ที่ผิดพลาด: SELECT * FORM employees;",
                    "SELECT * FROM employees;",
                    "ต้องใช้ FROM ไม่ใช่ FORM เพื่อระบุตารางต้นทาง"
                ),

                Q(
                    "51-2",
                    "แก้ไขคำสั่ง SQL ที่ผิดพลาด: SELECT name FROM employees WHERE salary => 30000;",
                    "SELECT name FROM employees WHERE salary >= 30000;",
                    "เครื่องหมายมากกว่าหรือเท่ากับใน MySQL คือ >="
                ),

                Q(
                    "51-3",
                    "แก้ไขคำสั่ง SQL ที่ผิดพลาด: SELECT name, salary FROM employees ORDER BY DESC;",
                    "SELECT name, salary FROM employees ORDER BY salary DESC;",
                    "ORDER BY ต้องระบุคอลัมน์หรือ Expression ที่ต้องการเรียงลำดับ"
                ),

                Q(
                    "51-4",
                    "แก้ไขคำสั่ง SQL ที่ผิดพลาด: SELECT department_id, COUNT(*) FROM employees WHERE COUNT(*) > 5 GROUP BY department_id;",
                    "SELECT department_id, COUNT(*) AS total FROM employees GROUP BY department_id HAVING COUNT(*) > 5;",
                    "Aggregate Function ที่ใช้กรองกลุ่มต้องอยู่ใน HAVING ไม่ใช่ WHERE"
                ),

                Q(
                    "51-5",
                    "แก้ไขคำสั่ง SQL ที่ผิดพลาด: SELECT * FROM employees WHERE department_id = NULL;",
                    "SELECT * FROM employees WHERE department_id IS NULL;",
                    "การตรวจสอบค่า NULL ต้องใช้ IS NULL"
                )
            ]
        ),

        // ==================================================
        // 52. TRANSACTION AND DEADLOCK
        // ==================================================
        G(
            52,
            "Transaction, Locking and Deadlock",
            "การจัดการ Transaction และปัญหาการทำงานพร้อมกัน",
            [
                Q(
                    "52-1",
                    "Deadlock ในฐานข้อมูลหมายถึงอะไร",
                    "Deadlock คือสถานการณ์ที่ Transaction ตั้งแต่สองรายการขึ้นไปรอ Lock ที่อีกฝ่ายถืออยู่จนไม่สามารถดำเนินการต่อได้ตามปกติ",
                    "InnoDB สามารถตรวจพบ Deadlock และเลือก Transaction หนึ่งเป็นเหยื่อเพื่อ Rollback"
                ),

                Q(
                    "52-2",
                    "เขียนคำสั่ง SQL เพื่อล็อกแถวบัญชี account_id = 1 สำหรับการแก้ไขภายใน Transaction",
                    "START TRANSACTION; SELECT * FROM accounts WHERE account_id = 1 FOR UPDATE;",
                    "SELECT FOR UPDATE ใช้ขอ Lock สำหรับแถวที่อ่านภายใน Transaction โดยต้อง COMMIT หรือ ROLLBACK เมื่อเสร็จงาน"
                ),

                Q(
                    "52-3",
                    "อธิบายความแตกต่างระหว่าง SELECT FOR UPDATE และ SELECT FOR SHARE",
                    "FOR UPDATE ใช้ขอ Exclusive Lock สำหรับแถวที่อ่าน ส่วน FOR SHARE ใช้ขอ Shared Lock เพื่อป้องกันการแก้ไขที่ขัดแย้งกันระหว่าง Transaction",
                    "ทั้งสองคำสั่งใช้ควบคุมการเข้าถึงข้อมูลพร้อมกันใน InnoDB"
                ),

                Q(
                    "52-4",
                    "หาก Transaction เกิด Deadlock แอปพลิเคชันควรจัดการอย่างไร",
                    "ROLLBACK Transaction ที่ล้มเหลว แล้ว Retry ทั้ง Transaction ตามนโยบายที่กำหนด โดยจำกัดจำนวนครั้งและจัดการข้อผิดพลาดอย่างเหมาะสม",
                    "การ Retry ต้องพิจารณาความปลอดภัยในการทำซ้ำและไม่ควร Retry แบบไม่จำกัด"
                ),

                Q(
                    "52-5",
                    "อธิบายแนวทางลดโอกาสเกิด Deadlock ในระบบฐานข้อมูล",
                    "เข้าถึงตารางและแถวตามลำดับเดียวกัน ลดระยะเวลา Transaction สร้าง Index ที่เหมาะสม และลดการล็อกข้อมูลที่ไม่จำเป็น",
                    "แนวทางเหล่านี้ช่วยลดโอกาส Deadlock แต่ไม่สามารถรับประกันว่าจะไม่เกิดขึ้น"
                )
            ]
        ),

        // ==================================================
        // 53. DATA ANALYSIS
        // ==================================================
        G(
            53,
            "SQL Data Analysis",
            "การวิเคราะห์ข้อมูลและการจัดทำรายงาน",
            [
                Q(
                    "53-1",
                    "แสดงจำนวนพนักงานและเงินเดือนเฉลี่ยของแต่ละแผนกจากตาราง employees",
                    "SELECT department_id, COUNT(*) AS total_employees, AVG(salary) AS average_salary FROM employees GROUP BY department_id;",
                    "COUNT ใช้นับจำนวนพนักงานและ AVG ใช้คำนวณเงินเดือนเฉลี่ย"
                ),

                Q(
                    "53-2",
                    "แสดงยอดขายรวมของแต่ละเดือนในปี 2025 จากตาราง orders ที่มี order_date และ total_amount",
                    "SELECT YEAR(order_date) AS sales_year, MONTH(order_date) AS sales_month, SUM(total_amount) AS total_sales FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01' GROUP BY YEAR(order_date), MONTH(order_date) ORDER BY sales_year, sales_month;",
                    "ใช้ YEAR, MONTH, SUM และ GROUP BY เพื่อสรุปยอดขายรายเดือน"
                ),

                Q(
                    "53-3",
                    "ค้นหาสินค้า 5 รายการที่มีราคาสูงที่สุดจากตาราง products",
                    "SELECT * FROM products ORDER BY price DESC LIMIT 5;",
                    "ORDER BY DESC เรียงราคาจากมากไปน้อย และ LIMIT จำกัดจำนวนรายการ"
                ),

                Q(
                    "53-4",
                    "แสดงลูกค้าที่มียอดซื้อรวมสูงที่สุด 3 อันดับแรก โดยใช้ customers(id, customer_name) และ orders(customer_id, total_amount)",
                    "SELECT c.id, c.customer_name, SUM(o.total_amount) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.customer_name ORDER BY total_spent DESC LIMIT 3;",
                    "ใช้ JOIN, SUM, GROUP BY และ LIMIT เพื่อหาลูกค้าที่มียอดซื้อสูงสุด"
                ),

                Q(
                    "53-5",
                    "แสดงจำนวนพนักงานในแต่ละแผนก โดยแสดงเฉพาะแผนกที่มีพนักงานตั้งแต่ 10 คนขึ้นไป",
                    "SELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id HAVING COUNT(*) >= 10;",
                    "HAVING ใช้กรองผลลัพธ์หลังการจัดกลุ่ม"
                )
            ]
        ),

        // ==================================================
        // 54. PRACTICAL DATABASE SCENARIOS
        // ==================================================
        G(
            54,
            "Practical Database Scenarios",
            "การประยุกต์ใช้ SQL ในระบบงานจริง",
            [
                Q(
                    "54-1",
                    "เขียน SQL เพื่อตรวจสอบว่ามีผู้ใช้งานที่มี email = 'test@example.com' อยู่ในตาราง users หรือไม่ โดยใช้ EXISTS",
                    "SELECT EXISTS (SELECT 1 FROM users WHERE email = 'test@example.com') AS email_exists;",
                    "EXISTS คืนค่า 1 เมื่อพบข้อมูล และ 0 เมื่อไม่พบ"
                ),

                Q(
                    "54-2",
                    "เขียน SQL เพื่อตรวจสอบรายการจองห้อง room_id = 1 วันที่ 2025-12-01 ที่ทับซ้อนช่วง 13:00 ถึง 15:00 โดยใช้ตาราง bookings และสมมติช่วงเวลาแบบต้นรวมปลายไม่รวม",
                    "SELECT * FROM bookings WHERE room_id = 1 AND booking_date = '2025-12-01' AND start_time < '15:00:00' AND end_time > '13:00:00';",
                    "การตรวจช่วงเวลาทับซ้อนใช้ start_time < เวลาสิ้นสุดใหม่ และ end_time > เวลาเริ่มใหม่"
                ),

                Q(
                    "54-3",
                    "เขียน SQL เพื่อเปลี่ยนสถานะการจอง booking_id = 10 เป็น approved โดยแก้ไขเฉพาะรายการที่มีสถานะ pending",
                    "UPDATE bookings SET status = 'approved' WHERE booking_id = 10 AND status = 'pending';",
                    "WHERE ช่วยจำกัดการแก้ไขเฉพาะรายการที่มีสถานะตรงเงื่อนไข"
                ),

                Q(
                    "54-4",
                    "เขียน SQL เพื่อนับจำนวนการจองในแต่ละสถานะจากตาราง bookings",
                    "SELECT status, COUNT(*) AS total FROM bookings GROUP BY status;",
                    "GROUP BY ใช้รวมข้อมูลตามสถานะและ COUNT ใช้นับจำนวน"
                ),

                Q(
                    "54-5",
                    "เขียน SQL เพื่อค้นหารายการจองที่มี booking_date ตั้งแต่วันที่ปัจจุบันเป็นต้นไป เรียงตามวันและเวลาเริ่มต้น",
                    "SELECT * FROM bookings WHERE booking_date >= CURDATE() ORDER BY booking_date ASC, start_time ASC;",
                    "CURDATE คืนวันที่ปัจจุบันของ Session และ ORDER BY ใช้เรียงรายการ"
                )
            ]
        ),

        // ==================================================
        // 55. FINAL SQL CHALLENGE
        // ==================================================
        G(
            55,
            "Final SQL Challenge",
            "ข้อสอบประยุกต์ MySQL ระดับกลางถึงสูง",
            [
                Q(
                    "55-1",
                    "ค้นหาพนักงานที่มีเงินเดือนสูงเป็นอันดับ 3 แบบไม่ซ้ำ โดยใช้ DENSE_RANK",
                    "WITH ranked AS (SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank FROM employees) SELECT name, salary FROM ranked WHERE salary_rank = 3;",
                    "DENSE_RANK จัดอันดับโดยไม่ข้ามอันดับเมื่อมีเงินเดือนเท่ากัน"
                ),

                Q(
                    "55-2",
                    "ค้นหาพนักงานที่มีเงินเดือนสูงกว่าค่าเฉลี่ยของแผนกตนเอง โดยใช้ Correlated Subquery",
                    "SELECT e.* FROM employees e WHERE e.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = e.department_id);",
                    "Correlated Subquery อ้างอิง department_id จาก Query ชั้นนอก"
                ),

                Q(
                    "55-3",
                    "ค้นหาลูกค้าที่ไม่เคยมีคำสั่งซื้อ โดยใช้ NOT EXISTS",
                    "SELECT c.* FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
                    "NOT EXISTS ใช้ค้นหาแถวที่ไม่มีข้อมูลสัมพันธ์ในอีกตาราง"
                ),

                Q(
                    "55-4",
                    "เขียน SQL เพื่อแสดงยอดขายสะสมตามวันที่ โดยใช้ตาราง orders ที่มี order_date และ total_amount",
                    "WITH daily_sales AS (SELECT DATE(order_date) AS sales_date, SUM(total_amount) AS daily_total FROM orders GROUP BY DATE(order_date)) SELECT sales_date, daily_total, SUM(daily_total) OVER (ORDER BY sales_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sales FROM daily_sales ORDER BY sales_date;",
                    "ใช้ CTE สรุปยอดขายรายวันก่อน แล้วใช้ Window Function คำนวณยอดขายสะสม"
                ),

                Q(
                    "55-5",
                    "เขียน SQL เพื่อแสดงแผนกที่มีพนักงานมากที่สุด โดยใช้ employees ที่มี department_id และ id หากมีจำนวนเท่ากันให้แสดงทุกแผนก",
                    "WITH department_counts AS (SELECT department_id, COUNT(*) AS total FROM employees GROUP BY department_id), ranked AS (SELECT department_id, total, DENSE_RANK() OVER (ORDER BY total DESC) AS rnk FROM department_counts) SELECT department_id, total FROM ranked WHERE rnk = 1;",
                    "ใช้ CTE ร่วมกับ DENSE_RANK เพื่อเลือกแผนกที่มีจำนวนพนักงานสูงสุดโดยไม่ตัดกรณีอันดับเท่ากัน"
                )
            ]
        )
    ];

    // ==============================================
    // ตรวจสอบก่อนเพิ่มข้อสอบ
    // ==============================================

    const existingIds = new Set(
        window.QUESTION_BANK.map(group => group.id)
    );

    const duplicates = newQuestions.filter(
        group => existingIds.has(group.id)
    );

    if (duplicates.length > 0) {
        console.warn(
            "พบข้อใหญ่ที่มีอยู่แล้ว:",
            duplicates.map(group => group.id)
        );
        return;
    }

    if (newQuestions.some(group => group.questions.length !== 5)) {
        console.error("ข้อสอบใหม่บางข้อมีข้อย่อยไม่ครบ 5 ข้อ");
        return;
    }

    window.QUESTION_BANK.push(...newQuestions);

    // ==============================================
    // ตรวจสอบคลังข้อสอบทั้งหมด
    // ==============================================

    const groups = window.QUESTION_BANK;

    const totalQuestions = groups.reduce(
        (sum, group) => sum + group.questions.length,
        0
    );

    const majorIds = groups.map(group => group.id);

    const questionIds = groups.flatMap(
        group => group.questions.map(q => q.id)
    );

    const validation = {
        majorQuestions: groups.length,
        subQuestions: totalQuestions,
        expectedMajorQuestions: 55,
        expectedSubQuestions: 275,
        allGroupsHaveFive: groups.every(
            group => group.questions.length === 5
        ),
        uniqueMajorIds:
            new Set(majorIds).size === majorIds.length,
        uniqueQuestionIds:
            new Set(questionIds).size === questionIds.length,
        complete:
            groups.length === 55 &&
            totalQuestions === 275
    };

    console.log(
        "SQL Practice Exam - Final Validation:",
        validation
    );

    if (validation.complete &&
        validation.allGroupsHaveFive &&
        validation.uniqueMajorIds &&
        validation.uniqueQuestionIds) {
        console.log("คลังข้อสอบครบ 55 ข้อใหญ่ 275 ข้อย่อย");
    } else {
        console.warn("กรุณาตรวจสอบความครบถ้วนของคลังข้อสอบ");
    }

})();


/* SQL-only practice: replace explanatory questions with executable SQL tasks. */
(function () {
  'use strict';
  const replacements = {
  "4-5": {
    "prompt": "สร้างตาราง registrations สำหรับความสัมพันธ์หลายต่อหลายระหว่าง participants และ courses โดยใช้คีย์ประกอบและ Foreign Key",
    "answer": "CREATE TABLE registrations (participant_id BIGINT NOT NULL, course_id BIGINT NOT NULL, PRIMARY KEY (participant_id, course_id), FOREIGN KEY (participant_id) REFERENCES participants(id), FOREIGN KEY (course_id) REFERENCES courses(id));",
    "expectedSql": "CREATE TABLE registrations (participant_id BIGINT NOT NULL, course_id BIGINT NOT NULL, PRIMARY KEY (participant_id, course_id), FOREIGN KEY (participant_id) REFERENCES participants(id), FOREIGN KEY (course_id) REFERENCES courses(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "9-5": {
    "prompt": "ค้นหาพนักงานในตาราง employees ที่คอลัมน์ email เป็น NULL โดยใช้เงื่อนไขที่ถูกต้อง",
    "answer": "SELECT * FROM employees WHERE email IS NULL;",
    "expectedSql": "SELECT * FROM employees WHERE email IS NULL;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "17-3": {
    "prompt": "เขียน SQL เพิ่มพนักงานจากตาราง old_employees ไปยัง employees โดยเลือกเฉพาะแผนก IT ด้วย INSERT ... SELECT",
    "answer": "INSERT INTO employees (first_name, department, salary) SELECT first_name, department, salary FROM old_employees WHERE department = 'IT';",
    "expectedSql": "INSERT INTO employees (first_name, department, salary) SELECT first_name, department, salary FROM old_employees WHERE department = 'IT';",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "17-5": {
    "prompt": "เขียนคำสั่งส่งออก employee_id และ first_name จาก employees เป็นไฟล์ CSV ที่ /tmp/employees_export.csv ด้วย INTO OUTFILE",
    "answer": "SELECT employee_id, first_name FROM employees INTO OUTFILE '/tmp/employees_export.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n';",
    "expectedSql": "SELECT employee_id, first_name FROM employees INTO OUTFILE '/tmp/employees_export.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n';",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "19-5": {
    "prompt": "เขียน SQL ลบข้อมูลทุกแถวใน employees แต่ยังคงโครงสร้างตารางไว้ โดยใช้ TRUNCATE",
    "answer": "TRUNCATE TABLE employees;",
    "expectedSql": "TRUNCATE TABLE employees;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "20-1": {
    "prompt": "เขียน SQL ลบเฉพาะพนักงานแผนก HR ออกจาก employees โดยไม่ลบโครงสร้างตาราง",
    "answer": "DELETE FROM employees WHERE department = 'HR';",
    "expectedSql": "DELETE FROM employees WHERE department = 'HR';",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "20-5": {
    "prompt": "เขียน SQL ลบข้อมูลทั้งหมดใน employees ด้วย TRUNCATE TABLE",
    "answer": "TRUNCATE TABLE employees;",
    "expectedSql": "TRUNCATE TABLE employees;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "21-1": {
    "prompt": "เขียน SQL เพิ่มผู้ใช้ id=10 ชื่อ 'Somchai' ลงใน users โดยใช้ INSERT IGNORE เพื่อข้ามรายการที่มีคีย์ซ้ำ",
    "answer": "INSERT IGNORE INTO users (id, name) VALUES (10, 'Somchai');",
    "expectedSql": "INSERT IGNORE INTO users (id, name) VALUES (10, 'Somchai');",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "21-3": {
    "prompt": "เขียน SQL ใช้ REPLACE INTO เพื่อเพิ่มหรือแทนที่แถวใน users ที่มี id=10 และ name='Somchai'",
    "answer": "REPLACE INTO users (id, name) VALUES (10, 'Somchai');",
    "expectedSql": "REPLACE INTO users (id, name) VALUES (10, 'Somchai');",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "21-5": {
    "prompt": "เขียน SQL เพิ่มสินค้า id=1 ชื่อ 'Pen' stock=10 และหากคีย์ซ้ำให้ปรับ stock เป็น 10 ด้วย ON DUPLICATE KEY UPDATE",
    "answer": "INSERT INTO products (id, product_name, stock) VALUES (1, 'Pen', 10) ON DUPLICATE KEY UPDATE stock = 10;",
    "expectedSql": "INSERT INTO products (id, product_name, stock) VALUES (1, 'Pen', 10) ON DUPLICATE KEY UPDATE stock = 10;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "22-1": {
    "prompt": "เขียน SQL เริ่ม Transaction จากนั้นเพิ่มเงินเดือนพนักงาน id=1 อีก 500 และ COMMIT",
    "answer": "START TRANSACTION; UPDATE employees SET salary = salary + 500 WHERE id = 1; COMMIT;",
    "expectedSql": "START TRANSACTION; UPDATE employees SET salary = salary + 500 WHERE id = 1; COMMIT;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "22-2": {
    "prompt": "เขียน SQL เริ่ม Transaction ปรับเงินเดือนพนักงาน id=1 เป็น 30000 แล้วบันทึกการเปลี่ยนแปลงถาวร",
    "answer": "START TRANSACTION; UPDATE employees SET salary = 30000 WHERE id = 1; COMMIT;",
    "expectedSql": "START TRANSACTION; UPDATE employees SET salary = 30000 WHERE id = 1; COMMIT;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "22-3": {
    "prompt": "เขียน SQL เริ่ม Transaction ลบพนักงาน id=1 แล้วใช้คำสั่งยกเลิกการเปลี่ยนแปลง",
    "answer": "START TRANSACTION; DELETE FROM employees WHERE id = 1; ROLLBACK;",
    "expectedSql": "START TRANSACTION; DELETE FROM employees WHERE id = 1; ROLLBACK;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "23-1": {
    "prompt": "เขียน SQL เริ่ม Transaction ตั้ง SAVEPOINT ชื่อ sp1 แล้ว COMMIT",
    "answer": "START TRANSACTION; SAVEPOINT sp1; COMMIT;",
    "expectedSql": "START TRANSACTION; SAVEPOINT sp1; COMMIT;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "23-3": {
    "prompt": "เขียน SQL เริ่ม Transaction ตั้ง SAVEPOINT sp1 ปรับเงินเดือนพนักงาน id=1 แล้ว ROLLBACK TO SAVEPOINT sp1",
    "answer": "START TRANSACTION; SAVEPOINT sp1; UPDATE employees SET salary = 40000 WHERE id = 1; ROLLBACK TO SAVEPOINT sp1;",
    "expectedSql": "START TRANSACTION; SAVEPOINT sp1; UPDATE employees SET salary = 40000 WHERE id = 1; ROLLBACK TO SAVEPOINT sp1;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "23-4": {
    "prompt": "เขียน SQL เริ่ม Transaction ตั้ง SAVEPOINT sp1 จากนั้นลบ SAVEPOINT ดังกล่าวและ COMMIT",
    "answer": "START TRANSACTION; SAVEPOINT sp1; RELEASE SAVEPOINT sp1; COMMIT;",
    "expectedSql": "START TRANSACTION; SAVEPOINT sp1; RELEASE SAVEPOINT sp1; COMMIT;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "24-1": {
    "prompt": "เขียน SQL เริ่ม Transaction โอนยอด 100 จากบัญชี id=1 ไปบัญชี id=2 ใน accounts(balance) แล้ว COMMIT",
    "answer": "START TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;",
    "expectedSql": "START TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "24-2": {
    "prompt": "เขียน SQL กำหนด Isolation Level ของ Transaction ถัดไปเป็น READ UNCOMMITTED แล้วเริ่ม Transaction",
    "answer": "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; START TRANSACTION;",
    "expectedSql": "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; START TRANSACTION;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "24-3": {
    "prompt": "เขียน SQL กำหนด Isolation Level ของ Transaction ถัดไปเป็น READ COMMITTED แล้วเริ่ม Transaction",
    "answer": "SET TRANSACTION ISOLATION LEVEL READ COMMITTED; START TRANSACTION;",
    "expectedSql": "SET TRANSACTION ISOLATION LEVEL READ COMMITTED; START TRANSACTION;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "24-4": {
    "prompt": "เขียน SQL กำหนด Isolation Level ของ Transaction ถัดไปเป็น REPEATABLE READ แล้วเริ่ม Transaction",
    "answer": "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; START TRANSACTION;",
    "expectedSql": "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; START TRANSACTION;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "24-5": {
    "prompt": "เขียน SQL กำหนด Isolation Level ของ Transaction ถัดไปเป็น SERIALIZABLE แล้วเริ่ม Transaction",
    "answer": "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE; START TRANSACTION;",
    "expectedSql": "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE; START TRANSACTION;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "25-1": {
    "prompt": "เขียน SQL สร้างตาราง products โดยมี id เป็น PRIMARY KEY และ price เป็น DECIMAL(10,2) NOT NULL พร้อม CHECK price >= 0",
    "answer": "CREATE TABLE products (id INT PRIMARY KEY, price DECIMAL(10,2) NOT NULL, CHECK (price >= 0));",
    "expectedSql": "CREATE TABLE products (id INT PRIMARY KEY, price DECIMAL(10,2) NOT NULL, CHECK (price >= 0));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "25-2": {
    "prompt": "เขียน SQL สร้างตาราง departments(id PRIMARY KEY) และ employees(id PRIMARY KEY, department_id FOREIGN KEY)",
    "answer": "CREATE TABLE departments (id INT PRIMARY KEY); CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "expectedSql": "CREATE TABLE departments (id INT PRIMARY KEY); CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "25-4": {
    "prompt": "เขียน SQL สร้างตาราง orders ที่มี customer_id อ้างอิง customers(id) และลบรายการ orders ตามเมื่อแถวลูกค้าถูกลบ",
    "answer": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE);",
    "expectedSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "25-5": {
    "prompt": "เขียน SQL เปิด Safe Update Mode สำหรับ Session ปัจจุบัน",
    "answer": "SET SQL_SAFE_UPDATES = 1;",
    "expectedSql": "SET SQL_SAFE_UPDATES = 1;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "26-5": {
    "prompt": "เขียน SQL สร้างตาราง users โดย id เป็น PRIMARY KEY, email ห้าม NULL และไม่ซ้ำ",
    "answer": "CREATE TABLE users (id INT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE);",
    "expectedSql": "CREATE TABLE users (id INT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "27-4": {
    "prompt": "เขียน SQL สร้างตาราง products ที่มี id เป็น PRIMARY KEY และ name VARCHAR(100) NOT NULL",
    "answer": "CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100) NOT NULL);",
    "expectedSql": "CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100) NOT NULL);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "28-4": {
    "prompt": "เขียน SQL สร้างตาราง orders ที่มี customer_id เป็น Foreign Key อ้างอิง customers(id) พร้อม ON DELETE RESTRICT",
    "answer": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT);",
    "expectedSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "28-5": {
    "prompt": "เขียน SQL สร้างตาราง orders ที่มี customer_id อ้างอิง customers(id) และกำหนด ON DELETE SET NULL",
    "answer": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT NULL, FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL);",
    "expectedSql": "CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT NULL, FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "30-3": {
    "prompt": "เขียน SQL สร้างตาราง products ที่มี code CHAR(5) และ name VARCHAR(100)",
    "answer": "CREATE TABLE products (id INT PRIMARY KEY, code CHAR(5), name VARCHAR(100));",
    "expectedSql": "CREATE TABLE products (id INT PRIMARY KEY, code CHAR(5), name VARCHAR(100));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "30-5": {
    "prompt": "เขียน SQL สร้างตาราง users ที่มี is_active BOOLEAN NOT NULL DEFAULT TRUE",
    "answer": "CREATE TABLE users (id INT PRIMARY KEY, is_active BOOLEAN NOT NULL DEFAULT TRUE);",
    "expectedSql": "CREATE TABLE users (id INT PRIMARY KEY, is_active BOOLEAN NOT NULL DEFAULT TRUE);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "31-1": {
    "prompt": "เขียน SQL สร้างตาราง customers(id,name) และ orders(id,customer_id) โดยเชื่อม Foreign Key แทนการเก็บชื่อลูกค้าซ้ำใน orders",
    "answer": "CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100)); CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id));",
    "expectedSql": "CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100)); CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "31-2": {
    "prompt": "เขียน SQL สร้างตาราง order_items ที่เก็บสินค้าแต่ละรายการเป็นหนึ่งแถว โดยมี order_id, product_id และ quantity พร้อมคีย์ประกอบ",
    "answer": "CREATE TABLE order_items (order_id INT, product_id INT, quantity INT NOT NULL, PRIMARY KEY (order_id, product_id));",
    "expectedSql": "CREATE TABLE order_items (order_id INT, product_id INT, quantity INT NOT NULL, PRIMARY KEY (order_id, product_id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "31-3": {
    "prompt": "เขียน SQL สร้างตาราง enrollments สำหรับ student_id และ course_id เป็น Composite Primary Key โดยเก็บ course_name ไว้ในตาราง courses แยกต่างหาก",
    "answer": "CREATE TABLE courses (id INT PRIMARY KEY, course_name VARCHAR(100)); CREATE TABLE enrollments (student_id INT, course_id INT, PRIMARY KEY (student_id, course_id), FOREIGN KEY (course_id) REFERENCES courses(id));",
    "expectedSql": "CREATE TABLE courses (id INT PRIMARY KEY, course_name VARCHAR(100)); CREATE TABLE enrollments (student_id INT, course_id INT, PRIMARY KEY (student_id, course_id), FOREIGN KEY (course_id) REFERENCES courses(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "31-4": {
    "prompt": "เขียน SQL สร้างตาราง departments(id,name) และ employees(id,department_id) เพื่อไม่เก็บ department_name ซ้ำใน employees",
    "answer": "CREATE TABLE departments (id INT PRIMARY KEY, name VARCHAR(100)); CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "expectedSql": "CREATE TABLE departments (id INT PRIMARY KEY, name VARCHAR(100)); CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "31-5": {
    "prompt": "เขียน SQL สร้างตาราง customers(id,address) และ orders(id,customer_id) พร้อม Foreign Key เพื่อแยกที่อยู่ลูกค้าออกจากรายการสั่งซื้อ",
    "answer": "CREATE TABLE customers (id INT PRIMARY KEY, address VARCHAR(255)); CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id));",
    "expectedSql": "CREATE TABLE customers (id INT PRIMARY KEY, address VARCHAR(255)); CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "32-1": {
    "prompt": "เขียน SQL สร้าง Entity employees โดยมี id PRIMARY KEY และ name VARCHAR(100)",
    "answer": "CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(100));",
    "expectedSql": "CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(100));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "32-2": {
    "prompt": "เขียน SQL สร้างตาราง employees ที่มี Attribute id, employee_name และ salary โดยกำหนดชนิดข้อมูลเหมาะสม",
    "answer": "CREATE TABLE employees (id INT PRIMARY KEY, employee_name VARCHAR(100), salary DECIMAL(10,2));",
    "expectedSql": "CREATE TABLE employees (id INT PRIMARY KEY, employee_name VARCHAR(100), salary DECIMAL(10,2));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "32-3": {
    "prompt": "เขียน SQL สร้างความสัมพันธ์ One-to-Many ระหว่าง departments กับ employees โดยใช้ Foreign Key",
    "answer": "CREATE TABLE departments (id INT PRIMARY KEY); CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "expectedSql": "CREATE TABLE departments (id INT PRIMARY KEY); CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "32-4": {
    "prompt": "เขียน SQL สร้างตาราง enrollments เพื่อเชื่อม students และ courses แบบ Many-to-Many พร้อม Composite Primary Key และ Foreign Key ทั้งสองฝั่ง",
    "answer": "CREATE TABLE enrollments (student_id INT, course_id INT, PRIMARY KEY (student_id, course_id), FOREIGN KEY (student_id) REFERENCES students(id), FOREIGN KEY (course_id) REFERENCES courses(id));",
    "expectedSql": "CREATE TABLE enrollments (student_id INT, course_id INT, PRIMARY KEY (student_id, course_id), FOREIGN KEY (student_id) REFERENCES students(id), FOREIGN KEY (course_id) REFERENCES courses(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "32-5": {
    "prompt": "เขียน SQL สร้างตาราง employees ที่มี department_id เป็น Foreign Key อ้างอิง departments(id)",
    "answer": "CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "expectedSql": "CREATE TABLE employees (id INT PRIMARY KEY, department_id INT, FOREIGN KEY (department_id) REFERENCES departments(id));",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "33-5": {
    "prompt": "เขียน SQL สร้าง View ชื่อ department_totals ที่แสดง department_id และจำนวนพนักงานจาก employees ด้วย GROUP BY",
    "answer": "CREATE VIEW department_totals AS SELECT department_id, COUNT(*) AS total FROM employees GROUP BY department_id;",
    "expectedSql": "CREATE VIEW department_totals AS SELECT department_id, COUNT(*) AS total FROM employees GROUP BY department_id;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "34-5": {
    "prompt": "เขียน SQL สร้าง Index ชื่อ idx_employees_department บนคอลัมน์ department_id ของ employees",
    "answer": "CREATE INDEX idx_employees_department ON employees (department_id);",
    "expectedSql": "CREATE INDEX idx_employees_department ON employees (department_id);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "35-1": {
    "prompt": "เขียน SQL สร้าง Stored Procedure ชื่อ GetAllEmployees ที่ SELECT ข้อมูลทุกแถวจาก employees",
    "answer": "CREATE PROCEDURE GetAllEmployees() SELECT * FROM employees;",
    "expectedSql": "CREATE PROCEDURE GetAllEmployees() SELECT * FROM employees;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "36-1": {
    "prompt": "เขียน SQL สร้าง Stored Function ชื่อ AddTax ที่รับ amount DECIMAL(10,2) และคืนค่า amount * 1.07",
    "answer": "CREATE FUNCTION AddTax(amount DECIMAL(10,2)) RETURNS DECIMAL(10,2) DETERMINISTIC RETURN amount * 1.07;",
    "expectedSql": "CREATE FUNCTION AddTax(amount DECIMAL(10,2)) RETURNS DECIMAL(10,2) DETERMINISTIC RETURN amount * 1.07;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "36-5": {
    "prompt": "เขียน SQL สร้าง Stored Function ชื่อ DoubleValue รับ n INT และ RETURN n * 2",
    "answer": "CREATE FUNCTION DoubleValue(n INT) RETURNS INT DETERMINISTIC RETURN n * 2;",
    "expectedSql": "CREATE FUNCTION DoubleValue(n INT) RETURNS INT DETERMINISTIC RETURN n * 2;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "37-1": {
    "prompt": "เขียน SQL สร้าง Trigger ชื่อ before_insert_products ก่อน INSERT บน products เพื่อกำหนด NEW.created_at = NOW()",
    "answer": "CREATE TRIGGER before_insert_products BEFORE INSERT ON products FOR EACH ROW SET NEW.created_at = NOW();",
    "expectedSql": "CREATE TRIGGER before_insert_products BEFORE INSERT ON products FOR EACH ROW SET NEW.created_at = NOW();",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "37-3": {
    "prompt": "เขียน SQL สร้าง Trigger ชื่อ before_update_products ก่อน UPDATE บน products เพื่อกำหนด NEW.updated_at = NOW()",
    "answer": "CREATE TRIGGER before_update_products BEFORE UPDATE ON products FOR EACH ROW SET NEW.updated_at = NOW();",
    "expectedSql": "CREATE TRIGGER before_update_products BEFORE UPDATE ON products FOR EACH ROW SET NEW.updated_at = NOW();",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "37-5": {
    "prompt": "เขียน SQL สร้าง Trigger ชื่อ after_update_products หลัง UPDATE บน products เพื่อบันทึก product_id ลง product_logs(product_id) ด้วย NEW.id",
    "answer": "CREATE TRIGGER after_update_products AFTER UPDATE ON products FOR EACH ROW INSERT INTO product_logs (product_id) VALUES (NEW.id);",
    "expectedSql": "CREATE TRIGGER after_update_products AFTER UPDATE ON products FOR EACH ROW INSERT INTO product_logs (product_id) VALUES (NEW.id);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "38-1": {
    "prompt": "เขียน SQL ใช้ CTE ชื่อ high_salary เลือกพนักงานจาก employees ที่ salary > 30000 แล้ว SELECT ทุกแถวจาก CTE",
    "answer": "WITH high_salary AS (SELECT * FROM employees WHERE salary > 30000) SELECT * FROM high_salary;",
    "expectedSql": "WITH high_salary AS (SELECT * FROM employees WHERE salary > 30000) SELECT * FROM high_salary;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "38-4": {
    "prompt": "เขียน SQL ด้วย Recursive CTE สร้างลำดับตัวเลข 1 ถึง 5 และ SELECT ผลลัพธ์",
    "answer": "WITH RECURSIVE nums AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM nums WHERE n < 5) SELECT n FROM nums;",
    "expectedSql": "WITH RECURSIVE nums AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM nums WHERE n < 5) SELECT n FROM nums;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "41-3": {
    "prompt": "เขียน SQL รวมรายชื่อจาก customers และ suppliers โดยตัดชื่อที่ซ้ำกันออกด้วย UNION",
    "answer": "SELECT name FROM customers UNION SELECT name FROM suppliers;",
    "expectedSql": "SELECT name FROM customers UNION SELECT name FROM suppliers;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "42-5": {
    "prompt": "เขียน SQL ค้นหาลูกค้าใน customers ที่มีคำสั่งซื้ออย่างน้อยหนึ่งรายการใน orders โดยใช้ EXISTS",
    "answer": "SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
    "expectedSql": "SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "45-5": {
    "prompt": "เขียน SQL ให้สิทธิ์ SELECT เฉพาะตาราง shop_db.products แก่บัญชี 'report'@'localhost'",
    "answer": "GRANT SELECT ON shop_db.products TO 'report'@'localhost';",
    "expectedSql": "GRANT SELECT ON shop_db.products TO 'report'@'localhost';",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "46-1": {
    "prompt": "เขียน SQL แบบ Prepared Statement ของ MySQL เพื่อค้นหา users จาก id โดยใช้ ? เป็น Parameter แทนการต่อ String",
    "answer": "PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?'; SET @user_id = 1; EXECUTE stmt USING @user_id; DEALLOCATE PREPARE stmt;",
    "expectedSql": "PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?'; SET @user_id = 1; EXECUTE stmt USING @user_id; DEALLOCATE PREPARE stmt;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "46-3": {
    "prompt": "เขียน SQL Prepared Statement สำหรับค้นหา users ด้วย email โดยใช้ Parameter ? และ EXECUTE USING @email",
    "answer": "PREPARE stmt FROM 'SELECT * FROM users WHERE email = ?'; SET @email = 'a@example.com'; EXECUTE stmt USING @email; DEALLOCATE PREPARE stmt;",
    "expectedSql": "PREPARE stmt FROM 'SELECT * FROM users WHERE email = ?'; SET @email = 'a@example.com'; EXECUTE stmt USING @email; DEALLOCATE PREPARE stmt;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "46-4": {
    "prompt": "เขียน SQL สร้างบัญชี 'webapp'@'localhost' พร้อมกำหนดรหัสผ่านตัวอย่าง แล้วให้สิทธิ์ SELECT, INSERT, UPDATE เฉพาะ shop_db.*",
    "answer": "CREATE USER 'webapp'@'localhost' IDENTIFIED BY 'ChangeMe_StrongPassword_123!'; GRANT SELECT, INSERT, UPDATE ON shop_db.* TO 'webapp'@'localhost';",
    "expectedSql": "CREATE USER 'webapp'@'localhost' IDENTIFIED BY 'ChangeMe_StrongPassword_123!'; GRANT SELECT, INSERT, UPDATE ON shop_db.* TO 'webapp'@'localhost';",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "46-5": {
    "prompt": "เขียน SQL ตรวจสอบว่าการเชื่อมต่อ MySQL Session ปัจจุบันใช้ TLS โดยดูค่า Ssl_cipher",
    "answer": "SHOW STATUS LIKE 'Ssl_cipher';",
    "expectedSql": "SHOW STATUS LIKE 'Ssl_cipher';",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "47-3": {
    "prompt": "เขียน SQL ล็อกตารางทั้งหมดชั่วคราวด้วย FLUSH TABLES WITH READ LOCK เพื่อเตรียมการสำรองข้อมูล (ต้องมีสิทธิ์เหมาะสม)",
    "answer": "FLUSH TABLES WITH READ LOCK;",
    "expectedSql": "FLUSH TABLES WITH READ LOCK;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "47-4": {
    "prompt": "เขียน SQL ตรวจสอบตำแหน่ง Binary Log ปัจจุบันของ MySQL 8.0",
    "answer": "SHOW MASTER STATUS;",
    "expectedSql": "SHOW MASTER STATUS;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "47-5": {
    "prompt": "เขียน SQL ปลดล็อกตารางที่ล็อกไว้ใน Session ปัจจุบันหลังขั้นตอนสำรองข้อมูล",
    "answer": "UNLOCK TABLES;",
    "expectedSql": "UNLOCK TABLES;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "48-2": {
    "prompt": "เขียน SQL ใช้ EXPLAIN เพื่อตรวจสอบแผนการทำงานของ SELECT * FROM employees WHERE salary > 30000",
    "answer": "EXPLAIN SELECT * FROM employees WHERE salary > 30000;",
    "expectedSql": "EXPLAIN SELECT * FROM employees WHERE salary > 30000;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "48-3": {
    "prompt": "เขียน SQL แสดงเฉพาะ name และ salary ของพนักงานจาก employees แทนการใช้ SELECT *",
    "answer": "SELECT name, salary FROM employees;",
    "expectedSql": "SELECT name, salary FROM employees;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "48-4": {
    "prompt": "เขียน SQL ค้นหา orders ในปี 2025 ด้วยเงื่อนไขช่วงวันที่ที่รองรับการใช้ Index บน order_date",
    "answer": "SELECT * FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';",
    "expectedSql": "SELECT * FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "52-1": {
    "prompt": "เขียน SQL เริ่ม Transaction และล็อกแถว accounts ที่ id=1 ด้วย SELECT FOR UPDATE",
    "answer": "START TRANSACTION; SELECT * FROM accounts WHERE id = 1 FOR UPDATE;",
    "expectedSql": "START TRANSACTION; SELECT * FROM accounts WHERE id = 1 FOR UPDATE;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "52-3": {
    "prompt": "เขียน SQL เริ่ม Transaction และอ่านแถว accounts id=1 โดยใช้ SELECT FOR SHARE",
    "answer": "START TRANSACTION; SELECT * FROM accounts WHERE id = 1 FOR SHARE;",
    "expectedSql": "START TRANSACTION; SELECT * FROM accounts WHERE id = 1 FOR SHARE;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "52-4": {
    "prompt": "เขียน SQL ยกเลิก Transaction ที่ล้มเหลวด้วย ROLLBACK (การ Retry ต้องจัดการในแอปพลิเคชัน)",
    "answer": "ROLLBACK;",
    "expectedSql": "ROLLBACK;",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  },
  "52-5": {
    "prompt": "เขียน SQL สร้าง Index บน accounts(account_id) เพื่อช่วยลดการสแกนแถวเมื่อค้นหาบัญชีด้วย account_id",
    "answer": "CREATE INDEX idx_accounts_account_id ON accounts (account_id);",
    "expectedSql": "CREATE INDEX idx_accounts_account_id ON accounts (account_id);",
    "explanation": "ฝึกเขียนคำสั่ง SQL ตามเงื่อนไขที่กำหนด ตรวจสอบชื่อคอลัมน์ ตาราง และโครงสร้างคำสั่งกับแนวเฉลย",
    "type": "manual",
    "keywords": []
  }
};
  let changed = 0;
  for (const group of window.QUESTION_BANK) {
    for (const question of group.questions) {
      const replacement = replacements[question.id];
      if (replacement) { Object.assign(question, replacement); changed++; }
    }
  }
  if (changed !== 68) throw new Error('SQL-only question migration incomplete: ' + changed);
})();

/* Final SQL-only cleanup for non-SQL short answers and CLI examples. */
(function(){const replacements={"17-4": ["เขียนคำสั่ง SQL นำเข้าข้อมูลจากไฟล์ /tmp/employees.csv ไปยังตาราง employees โดยคั่นข้อมูลด้วยเครื่องหมายจุลภาค", "LOAD DATA INFILE '/tmp/employees.csv' INTO TABLE employees FIELDS TERMINATED BY ',' IGNORE 1 LINES;"], "30-1": ["เขียน SQL สร้างตาราง inventory โดยมี id เป็น PRIMARY KEY และ quantity เป็น INT NOT NULL", "CREATE TABLE inventory (id INT PRIMARY KEY, quantity INT NOT NULL);"], "30-2": ["เขียน SQL สร้างตาราง products ที่มี id เป็น PRIMARY KEY และ price เป็น DECIMAL(10,2)", "CREATE TABLE products (id INT PRIMARY KEY, price DECIMAL(10,2));"], "30-4": ["เขียน SQL สร้างตาราง events ที่มี id เป็น PRIMARY KEY และ starts_at เป็น DATETIME", "CREATE TABLE events (id INT PRIMARY KEY, starts_at DATETIME);"], "46-2": ["เขียน SQL Prepared Statement ของ MySQL เพื่อค้นหา users ด้วย id โดยใช้ Parameter ?", "PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?'; SET @id = 1; EXECUTE stmt USING @id; DEALLOCATE PREPARE stmt;"], "47-1": ["เขียน SQL แสดงรายชื่อฐานข้อมูลทั้งหมดบน MySQL Server ด้วย SHOW", "SHOW DATABASES;"], "47-2": ["เขียน SQL แสดงรายชื่อตารางทั้งหมดในฐานข้อมูล exam_db", "SHOW TABLES FROM exam_db;"]}; let count=0;for(const g of window.QUESTION_BANK){for(const q of g.questions){if(replacements[q.id]){const [prompt,answer]=replacements[q.id];Object.assign(q,{prompt,answer,expectedSql:answer,explanation:"ใช้คำสั่ง SQL ให้ตรงกับเงื่อนไขโจทย์",keywords:[]});count++;}}}if(count!==7)throw Error("SQL-only cleanup incomplete");})();
