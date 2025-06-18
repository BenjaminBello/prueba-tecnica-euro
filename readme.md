# Prueba técnica Grupo Euro.

## Aclaraciones y pasos generales:
1. Clonar el repositorio
2. La carpeta Proyecto-1 corresponde al backend realizado con .NET 8.
3. La carpeta Proyecto-2 corresponde al frontend realizado con React.

## Proyecto-1 (Backend):
1. Abrir la solución en Visual Studio 2022.
2. Restaurar los paquetes NuGet `dotnet restore` o desde Visual Studio.
3. Si es necesario, editar archivo appsettings.json para configurar la cadena de conexión a la base de datos. (Por defecto, utiliza una base de datos LocalDB).
4. Ejecutar `dotnet ef migrations add InitialCreate` para crear migración inicial de la bd.
5. Aplicar migración de la base de datos `dotnet ef database update`.
6. Para rellenar la base datos, pegar las siguientes sentencias SQL en el explorador de objetos de SQL Server en la base de datos UnitsDb:
```sql
INSERT INTO Units (Number, Address, Orientation, Bedrooms, Bathrooms, Model, RentPrice, CommonExpense)
VALUES 
('101-A', 'Calle Uno 123', 'Norte', 2, 1, 'A', 400000, 50000),
('102-B', 'Calle Dos 456', 'Sur', 3, 2, 'B', 550000, 60000),
('103-C', 'Calle Tres 789', 'Este', 1, 1, 'C', 300000, 45000),
('104-D', 'Calle Cuatro 101', 'Oeste', 2, 1, 'D', 450000, 50000),
('105-E', 'Calle Cinco 202', 'Norte', 2, 1, 'A', 400000, 50000),
('106-F', 'Calle Seis 303', 'Sur', 3, 2, 'B', 550000, 60000),
('107-G', 'Calle Siete 404', 'Este', 1, 1, 'C', 300000, 45000),
('108-H', 'Calle Ocho 505', 'Oeste', 2, 1, 'D', 450000, 50000),
('109-I', 'Calle Nueve 606', 'Norte', 2, 1, 'A', 400000, 50000),
('110-J', 'Calle Diez 707', 'Sur', 3, 2, 'B', 550000, 60000),
('111-K', 'Calle Once 808', 'Este', 1, 1, 'C', 300000, 45000),
('112-L', 'Calle Doce 909', 'Oeste', 2, 1, 'D', 450000, 50000),
('113-M', 'Calle Trece 111', 'Norte', 2, 1, 'A', 400000, 50000),
('114-N', 'Calle Catorce 222', 'Sur', 3, 2, 'B', 550000, 60000),
('115-O', 'Calle Quince 333', 'Este', 1, 1, 'C', 300000, 45000);

INSERT INTO Owners (Rut, Name, BirthDate, Email)
VALUES 
('12.345.678-1', 'Ana Pérez', '1985-01-01', 'ana@example.com'),
('12.345.678-2', 'Luis García', '1982-03-15', 'luis@example.com'),
('12.345.678-3', 'Sofía Ramírez', '1990-07-10', 'sofia@example.com'),
('12.345.678-4', 'Carlos Muñoz', '1975-12-22', 'carlos@example.com'),
('12.345.678-5', 'María López', '1992-05-17', 'maria@example.com'),
('12.345.678-6', 'José Torres', '1988-09-09', 'jose@example.com'),
('12.345.678-7', 'Fernanda Silva', '1995-04-03', 'fernanda@example.com'),
('12.345.678-8', 'Ricardo Díaz', '1981-06-30', 'ricardo@example.com'),
('12.345.678-9', 'Valentina Soto', '1983-10-11', 'valentina@example.com'),
('12.345.678-0', 'Javier Castro', '1979-08-24', 'javier@example.com'),
('11.111.111-1', 'Andrea Ruiz', '1991-03-14', 'andrea@example.com'),
('22.222.222-2', 'Cristian Rojas', '1986-11-19', 'cristian@example.com'),
('33.333.333-3', 'Paulina Vega', '1993-07-07', 'paulina@example.com'),
('44.444.444-4', 'Matías Herrera', '1984-02-28', 'matias@example.com'),
('55.555.555-5', 'Camila Núñez', '1987-09-21', 'camila@example.com');


INSERT INTO Ownerships (OwnerId, UnitId, OwnershipPercentage)
VALUES 
(1, 1, 100),
(2, 2, 100),
(3, 3, 100),
(4, 4, 100),
(5, 5, 100),
(6, 6, 100),
(7, 7, 100),
(8, 8, 100),
(9, 9, 100),
(10, 10, 100),
(11, 11, 100),
(12, 12, 100),
(13, 13, 100),
(14, 14, 100),
(15, 15, 100);
```

7. Ejecutar el proyecto `dotnet run` o desde Visual Studio.

## Proyecto-2 (Frontend):
1. Abrir la carpeta Proyecto-2 en Visual Studio Code o cualquier otro.
2. Instalar las dependencias con `npm install`.
3. Para la conexión al backend, editar el archivo .env y configurar la URL del backend. Por defecto es http://localhost:5081/api
4. Correr el proyecto con `npm run dev`.
5. Breve resumen de carpetas:
- **components**: Contiene los componentes reutilizables de la aplicación.
- **actions**: Contiene el manejo de las peticiones POST para añadir nuevos propietarios y unidades.
- **data**: Contiene el manejo de las peticiones GET para obtener los datos de propietarios y unidades.
- **entities**: Contiene las entidades con que se trabaja en la aplicación del lado del front.
- **api**: Contiene la configuración de axios para las peticiones al backend.