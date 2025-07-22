"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Search, Eye, Edit, Trash2, ShoppingCart, Truck, Package, TrendingUp, Euro, Users } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

export default function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPedido, setSelectedPedido] = useState<any>(null)
  const [editingPedido, setEditingPedido] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [newPedido, setNewPedido] = useState({
    cliente: "",
    contacto: "",
    email: "",
    telefono: "",
    fechaEntrega: new Date(),
    direccionEntrega: "",
    metodoPago: "",
    productos: [{ producto: "", cantidad: 1, precio: 0 }],
    notas: "",
  })
  const [isNewPedidoDialogOpen, setIsNewPedidoDialogOpen] = useState(false)
  const [productosDisponibles] = useState([
    { id: "aceite-500ml", nombre: "Aceite Virgen Extra 500ml", precio: 15.5 },
    { id: "garrafa-5l", nombre: "Garrafa 5L", precio: 68.0 },
    { id: "lata-250ml", nombre: "Lata Premium 250ml", precio: 12.75 },
    { id: "aceite-750ml", nombre: "Aceite Ecológico Bio 750ml", precio: 22.9 },
    { id: "bag-3l", nombre: "Bag in Box Profesional 3L", precio: 45.5 },
    { id: "aceite-1l", nombre: "Aceite Suave Familiar 1L", precio: 18.25 },
  ])
  const [clientesDisponibles] = useState([
    {
      id: "restaurante-olivo",
      nombre: "Restaurante El Olivo",
      contacto: "María González",
      email: "maria@elolivo.com",
      telefono: "+34 666 123 456",
      direccion: "Calle Mayor, 45, Jaén",
    },
    {
      id: "supermercados-garcia",
      nombre: "Supermercados García",
      contacto: "Juan García",
      email: "compras@supermercadosgarcia.com",
      telefono: "+34 666 789 012",
      direccion: "Polígono Industrial, Nave 12, Úbeda",
    },
    {
      id: "hotel-majestic",
      nombre: "Hotel Majestic",
      contacto: "Carmen López",
      email: "compras@hotelmajestic.com",
      telefono: "+34 666 456 789",
      direccion: "Avenida de Andalucía, 123, Baeza",
    },
  ])

  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: "Restaurante El Olivo",
      contacto: "María González",
      email: "maria@elolivo.com",
      telefono: "+34 666 123 456",
      fecha: "2024-01-15",
      fechaEntrega: "2024-01-17",
      productos: [{ nombre: "Aceite Virgen Extra 500ml", cantidad: 8, precio: 15.5, total: 124.0 }],
      subtotal: 124.0,
      iva: 12.4,
      total: 136.4,
      estado: "Entregado",
      metodoPago: "Transferencia",
      direccionEntrega: "Calle Mayor, 45, Jaén",
      notas: "Entrega en horario de mañana",
    },
    {
      id: 2,
      cliente: "Supermercados García",
      contacto: "Juan García",
      email: "compras@supermercadosgarcia.com",
      telefono: "+34 666 789 012",
      fecha: "2024-01-14",
      fechaEntrega: "2024-01-16",
      productos: [{ nombre: "Garrafa 5L", cantidad: 15, precio: 68.0, total: 1020.0 }],
      subtotal: 1020.0,
      iva: 102.0,
      total: 1122.0,
      estado: "Pendiente",
      metodoPago: "Transferencia 30 días",
      direccionEntrega: "Polígono Industrial, Nave 12, Úbeda",
      notas: "Confirmar recepción por email",
    },
    {
      id: 3,
      cliente: "Hotel Majestic",
      contacto: "Carmen López",
      email: "compras@hotelmajestic.com",
      telefono: "+34 666 456 789",
      fecha: "2024-01-13",
      fechaEntrega: "2024-01-15",
      productos: [{ nombre: "Lata Premium 250ml", cantidad: 35, precio: 12.75, total: 446.25 }],
      subtotal: 446.25,
      iva: 44.63,
      total: 490.88,
      estado: "Procesando",
      metodoPago: "Tarjeta",
      direccionEntrega: "Avenida de Andalucía, 123, Baeza",
      notas: "Entrega en recepción del hotel",
    },
    {
      id: 4,
      cliente: "Distribuidora Andaluza",
      contacto: "Pedro Martínez",
      email: "pedidos@distribuidoraandaluza.com",
      telefono: "+34 666 234 567",
      fecha: "2024-01-12",
      fechaEntrega: "2024-01-14",
      productos: [{ nombre: "Garrafa 5L", cantidad: 25, precio: 68.0, total: 1700.0 }],
      subtotal: 1700.0,
      iva: 170.0,
      total: 1870.0,
      estado: "Entregado",
      metodoPago: "Transferencia",
      direccionEntrega: "Polígono Sur, Nave 8, Córdoba",
      notas: "Cliente preferente",
    },
    {
      id: 5,
      cliente: "Restaurante La Aceituna",
      contacto: "Ana Jiménez",
      email: "ana@laaceituna.com",
      telefono: "+34 666 345 678",
      fecha: "2024-01-11",
      fechaEntrega: "2024-01-13",
      productos: [{ nombre: "Aceite Virgen Extra 500ml", cantidad: 12, precio: 15.5, total: 186.0 }],
      subtotal: 186.0,
      iva: 18.6,
      total: 204.6,
      estado: "Entregado",
      metodoPago: "Tarjeta",
      direccionEntrega: "Plaza de la Constitución, 12, Úbeda",
      notas: "Entrega por la tarde",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800"
      case "Procesando":
        return "bg-blue-100 text-blue-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleView = (pedido: any) => {
    setSelectedPedido(pedido)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (pedido: any) => {
    setEditingPedido({ ...pedido })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setPedidos((pedidos) => pedidos.map((pedido) => (pedido.id === editingPedido.id ? editingPedido : pedido)))
    setIsEditDialogOpen(false)
    setEditingPedido(null)
  }

  const handleDelete = (id: number) => {
    setPedidos((pedidos) => pedidos.filter((pedido) => pedido.id !== id))
  }

  const handleChangeStatus = (id: number, newStatus: string) => {
    setPedidos((pedidos) => pedidos.map((pedido) => (pedido.id === id ? { ...pedido, estado: newStatus } : pedido)))
  }

  const handleAddProductoPedido = () => {
    setNewPedido((prev) => ({
      ...prev,
      productos: [...prev.productos, { producto: "", cantidad: 1, precio: 0 }],
    }))
  }

  const handleRemoveProductoPedido = (index: number) => {
    setNewPedido((prev) => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index),
    }))
  }

  const handleProductoPedidoChange = (index: number, field: string, value: any) => {
    setNewPedido((prev) => ({
      ...prev,
      productos: prev.productos.map((producto, i) => {
        if (i === index) {
          if (field === "producto") {
            const productoSeleccionado = productosDisponibles.find((p) => p.id === value)
            return { ...producto, producto: value, precio: productoSeleccionado?.precio || 0 }
          }
          return { ...producto, [field]: value }
        }
        return producto
      }),
    }))
  }

  const handleClienteChange = (clienteId: string) => {
    const cliente = clientesDisponibles.find((c) => c.id === clienteId)
    if (cliente) {
      setNewPedido((prev) => ({
        ...prev,
        cliente: cliente.nombre,
        contacto: cliente.contacto,
        email: cliente.email,
        telefono: cliente.telefono,
        direccionEntrega: cliente.direccion,
      }))
    }
  }

  const calcularTotalesPedido = () => {
    const subtotal = newPedido.productos.reduce((sum, p) => sum + p.cantidad * p.precio, 0)
    const iva = subtotal * 0.1
    const total = subtotal + iva
    return { subtotal, iva, total }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleCreatePedido = () => {
    const { subtotal, iva, total } = calcularTotalesPedido()
    const nuevoPedido = {
      id: pedidos.length + 1,
      cliente: newPedido.cliente,
      contacto: newPedido.contacto,
      email: newPedido.email,
      telefono: newPedido.telefono,
      fecha: new Date().toISOString().split("T")[0],
      fechaEntrega: newPedido.fechaEntrega.toISOString().split("T")[0],
      productos: newPedido.productos.map((p) => {
        const producto = productosDisponibles.find((prod) => prod.id === p.producto)
        return {
          nombre: producto?.nombre || "",
          cantidad: p.cantidad,
          precio: p.precio,
          total: p.cantidad * p.precio,
        }
      }),
      subtotal,
      iva,
      total,
      estado: "Pendiente",
      metodoPago: newPedido.metodoPago,
      direccionEntrega: newPedido.direccionEntrega,
      notas: newPedido.notas,
    }

    setPedidos((prev) => [...prev, nuevoPedido])
    setNewPedido({
      cliente: "",
      contacto: "",
      email: "",
      telefono: "",
      fechaEntrega: new Date(),
      direccionEntrega: "",
      metodoPago: "",
      productos: [{ producto: "", cantidad: 1, precio: 0 }],
      notas: "",
    })
    setIsNewPedidoDialogOpen(false)
  }

  // Calcular estadísticas
  const totalPedidos = pedidos.length
  const ventasDelMes = pedidos.reduce((sum, pedido) => sum + pedido.total, 0)
  const pedidosPendientes = pedidos.filter((p) => p.estado === "Pendiente").length
  const ticketPromedio = ventasDelMes / totalPedidos
  const clientesUnicos = new Set(pedidos.map((p) => p.cliente)).size

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
          <p className="text-gray-600 mt-1">Administra las ventas y pedidos de aceite - Enero 2024</p>
        </div>
        <Dialog open={isNewPedidoDialogOpen} onOpenChange={setIsNewPedidoDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nuevo Pedido</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Información del Cliente</h3>
                  <div>
                    <Label htmlFor="cliente-select">Cliente</Label>
                    <Select onValueChange={handleClienteChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientesDisponibles.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contacto">Contacto</Label>
                      <Input
                        id="contacto"
                        value={newPedido.contacto}
                        onChange={(e) => setNewPedido((prev) => ({ ...prev, contacto: e.target.value }))}
                        placeholder="Nombre del contacto"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={newPedido.telefono}
                        onChange={(e) => setNewPedido((prev) => ({ ...prev, telefono: e.target.value }))}
                        placeholder="+34 666 123 456"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newPedido.email}
                      onChange={(e) => setNewPedido((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Información del Pedido</h3>
                  <div>
                    <Label>Fecha de Entrega</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPedido.fechaEntrega && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPedido.fechaEntrega ? formatDate(newPedido.fechaEntrega) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newPedido.fechaEntrega}
                          onSelect={(date) => date && setNewPedido((prev) => ({ ...prev, fechaEntrega: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="metodo-pago-pedido">Método de Pago</Label>
                    <Select
                      value={newPedido.metodoPago}
                      onValueChange={(value) => setNewPedido((prev) => ({ ...prev, metodoPago: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Método de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Transferencia">Transferencia</SelectItem>
                        <SelectItem value="Transferencia 30 días">Transferencia 30 días</SelectItem>
                        <SelectItem value="Efectivo">Efectivo</SelectItem>
                        <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="direccion-entrega">Dirección de Entrega</Label>
                    <Input
                      id="direccion-entrega"
                      value={newPedido.direccionEntrega}
                      onChange={(e) => setNewPedido((prev) => ({ ...prev, direccionEntrega: e.target.value }))}
                      placeholder="Dirección completa"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-semibold">Productos</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddProductoPedido}>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Producto
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-sm font-medium text-gray-600 pb-2 border-b">
                    <span>Producto</span>
                    <span>Cantidad</span>
                    <span>Precio Unit.</span>
                    <span>Total</span>
                    <span>Acciones</span>
                  </div>

                  {newPedido.productos.map((producto, index) => (
                    <div key={index} className="grid grid-cols-5 gap-2 items-center">
                      <Select
                        value={producto.producto}
                        onValueChange={(value) => handleProductoPedidoChange(index, "producto", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {productosDisponibles.map((prod) => (
                            <SelectItem key={prod.id} value={prod.id}>
                              {prod.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        type="number"
                        min="1"
                        value={producto.cantidad}
                        onChange={(e) =>
                          handleProductoPedidoChange(index, "cantidad", Number.parseInt(e.target.value) || 1)
                        }
                      />

                      <Input
                        type="number"
                        step="0.01"
                        value={producto.precio}
                        onChange={(e) =>
                          handleProductoPedidoChange(index, "precio", Number.parseFloat(e.target.value) || 0)
                        }
                      />

                      <div className="font-medium">€{(producto.cantidad * producto.precio).toFixed(2)}</div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProductoPedido(index)}
                        disabled={newPedido.productos.length === 1}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <Label>Subtotal</Label>
                  <div className="text-lg font-semibold">€{calcularTotalesPedido().subtotal.toFixed(2)}</div>
                </div>
                <div>
                  <Label>IVA (10%)</Label>
                  <div className="text-lg font-semibold">€{calcularTotalesPedido().iva.toFixed(2)}</div>
                </div>
                <div>
                  <Label>Total</Label>
                  <div className="text-xl font-bold text-[#708238]">€{calcularTotalesPedido().total.toFixed(2)}</div>
                </div>
              </div>

              <div>
                <Label htmlFor="notas-pedido">Notas</Label>
                <Textarea
                  id="notas-pedido"
                  placeholder="Notas adicionales para el pedido"
                  value={newPedido.notas}
                  onChange={(e) => setNewPedido((prev) => ({ ...prev, notas: e.target.value }))}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreatePedido} className="flex-1 bg-[#708238] hover:bg-[#5a6b2d]">
                  Crear Pedido
                </Button>
                <Button variant="outline" onClick={() => setIsNewPedidoDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Pedidos del Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalPedidos}</div>
            <p className="text-xs text-green-600 mt-1">+28% vs mes anterior</p>
            <p className="text-xs text-gray-500">Enero 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Euro className="w-4 h-4" />
              Ventas del Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€{ventasDelMes.toFixed(0)}</div>
            <p className="text-xs text-green-600 mt-1">+35% vs mes anterior</p>
            <p className="text-xs text-gray-500">Total facturado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Pedidos Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{pedidosPendientes}</div>
            <p className="text-xs text-yellow-600 mt-1">Requieren atención</p>
            <p className="text-xs text-gray-500">De {totalPedidos} totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Ticket Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€{ticketPromedio.toFixed(0)}</div>
            <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
            <p className="text-xs text-gray-500">Por pedido</p>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clientes Únicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{clientesUnicos}</div>
            <p className="text-xs text-gray-500 mt-1">Este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-blue-600">Garrafa 5L</div>
            <p className="text-xs text-gray-500 mt-1">40 unidades vendidas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-gray-500 mt-1">Pedidos completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#708238]" />
            Lista de Pedidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por cliente o producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
                <SelectItem value="procesando">Procesando</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-medium">#{pedido.id.toString().padStart(4, "0")}</TableCell>
                  <TableCell>{pedido.cliente}</TableCell>
                  <TableCell>{new Date(pedido.fecha).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>{pedido.productos.map((p) => `${p.nombre} x${p.cantidad}`).join(", ")}</TableCell>
                  <TableCell className="font-medium">€{pedido.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(pedido.estado)}>{pedido.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(pedido)} title="Ver detalles">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(pedido)} title="Editar">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {pedido.estado === "Pendiente" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleChangeStatus(pedido.id, "Procesando")}
                          title="Marcar como procesando"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Package className="w-4 h-4" />
                        </Button>
                      )}
                      {pedido.estado === "Procesando" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleChangeStatus(pedido.id, "Entregado")}
                          title="Marcar como entregado"
                          className="text-green-600 hover:text-green-700"
                        >
                          <Truck className="w-4 h-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminará permanentemente el pedido #{pedido.id}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(pedido.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Ver Detalles */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido #{selectedPedido?.id?.toString().padStart(4, "0")}</DialogTitle>
          </DialogHeader>
          {selectedPedido && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Información del Cliente</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Cliente:</span> {selectedPedido.cliente}
                    </p>
                    <p>
                      <span className="font-medium">Contacto:</span> {selectedPedido.contacto}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {selectedPedido.email}
                    </p>
                    <p>
                      <span className="font-medium">Teléfono:</span> {selectedPedido.telefono}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Información del Pedido</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Fecha del pedido:</span>{" "}
                      {new Date(selectedPedido.fecha).toLocaleDateString("es-ES")}
                    </p>
                    <p>
                      <span className="font-medium">Fecha de entrega:</span>{" "}
                      {new Date(selectedPedido.fechaEntrega).toLocaleDateString("es-ES")}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span>{" "}
                      <Badge className={getStatusColor(selectedPedido.estado)}>{selectedPedido.estado}</Badge>
                    </p>
                    <p>
                      <span className="font-medium">Método de pago:</span> {selectedPedido.metodoPago}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Productos</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Producto</th>
                        <th className="px-4 py-2 text-center">Cantidad</th>
                        <th className="px-4 py-2 text-right">Precio Unit.</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPedido.productos.map((producto: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{producto.nombre}</td>
                          <td className="px-4 py-2 text-center">{producto.cantidad}</td>
                          <td className="px-4 py-2 text-right">€{producto.precio.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right font-medium">€{producto.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Dirección de Entrega</h3>
                  <p>{selectedPedido.direccionEntrega}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Resumen</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{selectedPedido.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (10%):</span>
                      <span>€{selectedPedido.iva.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-1">
                      <span>Total:</span>
                      <span>€{selectedPedido.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPedido.notas && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notas</h3>
                  <p className="text-gray-600">{selectedPedido.notas}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsViewDialogOpen(false)} className="bg-[#708238] hover:bg-[#5a6b2d]">
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Editar */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Pedido</DialogTitle>
          </DialogHeader>
          {editingPedido && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-cliente">Cliente</Label>
                  <Input
                    id="edit-cliente"
                    value={editingPedido.cliente}
                    onChange={(e) => setEditingPedido({ ...editingPedido, cliente: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-contacto">Contacto</Label>
                  <Input
                    id="edit-contacto"
                    value={editingPedido.contacto}
                    onChange={(e) => setEditingPedido({ ...editingPedido, contacto: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-fecha-entrega">Fecha de Entrega</Label>
                  <Input
                    id="edit-fecha-entrega"
                    type="date"
                    value={editingPedido.fechaEntrega}
                    onChange={(e) => setEditingPedido({ ...editingPedido, fechaEntrega: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-estado">Estado</Label>
                  <Select
                    value={editingPedido.estado}
                    onValueChange={(value) => setEditingPedido({ ...editingPedido, estado: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Procesando">Procesando</SelectItem>
                      <SelectItem value="Entregado">Entregado</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-direccion">Dirección de Entrega</Label>
                <Input
                  id="edit-direccion"
                  value={editingPedido.direccionEntrega}
                  onChange={(e) => setEditingPedido({ ...editingPedido, direccionEntrega: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-notas">Notas</Label>
                <Input
                  id="edit-notas"
                  value={editingPedido.notas}
                  onChange={(e) => setEditingPedido({ ...editingPedido, notas: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="bg-[#708238] hover:bg-[#5a6b2d]">
                  Guardar Cambios
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
