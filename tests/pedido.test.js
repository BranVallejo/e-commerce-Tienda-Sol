import { PedidoService} from "../services/pedidoService.js";
import { PedidoController } from "../controllers/pedidoController.js";
import { jest } from '@jest/globals';

// Request de Producto
const reqProducto = {
        titulo: "Camiseta Deportiva",
        descripcion: "Camiseta de algodón de alta calidad para entrenamiento",
        precio: 1200,
        moneda: "ARS",
        stock: 50,
        fotos: [
            "https://example.com/foto1.jpg",
            "https://example.com/foto2.jpg"
        ],
        activo: true,
        categorias: [
            { nombre: "Ropa Deportiva" },
            { nombre: "Camisetas" }
        ],
        vendedor: 1
};

const reqPedido = {
    body: {
        "comprador": 1,
        "items": [
            {
                "producto": 1,
                "cantidad": 2
            }
        ],
        "moneda": "PESO_ARG",
        "direccionEntrega": {
            "calle": "Av. Siempre Viva",
            "altura": "742",
            "piso": "",
            "departamento": "B",
            "codigoPostal": "1414",
            "ciudad": "Buenos Aires",
            "provincia": "Buenos Aires",
            "pais": "Argentina",
            "lat": "-34.6037",
            "lon": "-58.3816"
        }
    }
};

// Response esperado de producto
const producto = {
    id: 1,
    vendedorID: 1,
    titulo: "Zapatillas deportivas",
    descripcion: "Zapatillas de running, talle 42, color azul",
    categorias: [
        { nombre: "deporte" },
        { nombre: "calzado" }
    ],
    precio: 35000,
    moneda: "PESO_ARG",
    stock: 20,
    fotos: [
        "https://example.com/img/zapatillas1.jpg",
        "https://example.com/img/zapatillas2.jpg"
    ],
    activo: true
};


// Response esperado de pedido


const pedidoResponse = {
    data:{
            id: 1,
            comprador: 1,
            items: [
                {producto: 1, cantidad: 2, precioUnitario: 35000}
            ],
            total: 70000,
            moneda: "PESO_ARG",
            direccionEntrega: {
                calle: "Av. Siempre Viva",
                altura: "742",
                piso: "",
                departamento: "B",
                codigoPostal: "1414",
                ciudad: "Buenos Aires",
                provincia: "Buenos Aires",
                pais: "Argentina",
                lat: "-34.6037"
            },
            estado: 0,
            fechaCreacion: new Date(),
            historialEstados: []
        },
        status: 201
}


const repoProducto = {
    findById: jest.fn().mockReturnValue(producto),
    getPrecio: jest.fn().mockReturnValue(35000),
    actualizarStock: jest.fn().mockReturnValue(), //Agregar lógica
    //create: jest.fn().mockReturnValue(pedidoResponse.data),
    create: jest.fn().mockResolvedValue(pedidoResponse.data)

};
const repoPedido = {
    create: jest.fn().mockResolvedValue(pedidoResponse.data),
    getPedidos: jest.fn().mockResolvedValue([pedidoResponse.data])

};

const pedidoService= new PedidoService(repoPedido, repoProducto);
const pedidoController = new PedidoController(pedidoService);

let res;

beforeEach(() => {
    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
});


test('Crea un pedido exitosamente', async () => {

    await pedidoController.crearPedido(reqPedido, res);

    // Creamos un objeto "resultado" como si fuese el res final
    const resultado = {
        status: res.status.mock.calls[0][0], // primer argumento de la primera llamada a status()
        data: res.json.mock.calls[0][0]      // primer argumento de la primera llamada a json()
    };

    // Comparamos usando expect.any(Date) para evitar fallo por fecha
    expect(resultado).toEqual({
        status: 201,
        data: {
            ...pedidoResponse.data,
            fechaCreacion: expect.any(Date) // acepta cualquier fecha válida
        }
    });
});

// Por qué se usa toHaveBeenCalledWith() en lugar de toEquals
test('Crea un pedido exitosamente 2', async () => {
    await pedidoController.crearPedido(reqPedido, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
        ...pedidoResponse.data,
        fechaCreacion: expect.any(Date)
    });
});


