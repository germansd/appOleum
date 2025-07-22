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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Eye, Edit, Download, FileText, Printer, Send, Euro } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FacturasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Agregar estos estados
  const [selectedFactura, setSelectedFactura] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Convertir facturas en estado
  const [facturas, setFacturas] = useState([
    {
      id: 1,
      numero: "ALM-2024-001",
      cliente: "Restaurante El Olivo",
      fecha: "2024-01-15",
      vencimiento: "2024-02-14",
      subtotal: 314.55,
      iva: 31.45,
      total: 345.0,
      estado: "Pagada",
      metodoPago: "Transferencia",
      productos: [{ nombre: "Aceite Virgen Extra 500ml", cantidad: 8, precio: 15.5 }],
    },
    {
      id: 2,
      numero: "ALM-2024-002",
      cliente: "Supermercados García",
      fecha: "2024-01-14",
      vencimiento: "2024-02-13",
      subtotal: 1954.55,
      iva: 195.45,
      total: 2150.0,
      estado: "Pendiente",
      metodoPago: "Pendiente",
      productos: [{ nombre: "Garrafa 5L", cantidad: 15, precio: 68.0 }],
    },
    {
      id: 3,
      numero: "ALM-2024-003",
      cliente: "Hotel Majestic",
      fecha: "2024-01-13",
      vencimiento: "2024-02-12",
      subtotal: 809.09,
      iva: 80.91,
      total: 890.0,
      estado: "Vencida",
      metodoPago: "Pendiente",
      productos: [{ nombre: "Lata Premium 250ml", cantidad: 35, precio: 12.75 }],
    },
    {
      id: 4,
      numero: "ALM-2024-004",
      cliente: "Distribuidora Andaluza",
      fecha: "2024-01-11",
      vencimiento: "2024-02-10",
      subtotal: 1527.27,
      iva: 152.73,
      total: 1680.0,
      estado: "Pagada",
      metodoPago: "Transferencia",
      productos: [{ nombre: "Garrafa 5L", cantidad: 25, precio: 68.0 }],
    },
    {
      id: 5,
      numero: "ALM-2024-005",
      cliente: "Restaurante La Aceituna",
      fecha: "2024-01-12",
      vencimiento: "2024-02-11",
      subtotal: 386.36,
      iva: 38.64,
      total: 425.0,
      estado: "Pagada",
      metodoPago: "Tarjeta",
      productos: [{ nombre: "Aceite Virgen Extra 500ml", cantidad: 12, precio: 15.5 }],
    },
    {
      id: 6,
      numero: "ALM-2024-006",
      cliente: "Hotel Los Olivos",
      fecha: "2024-01-10",
      vencimiento: "2024-02-09",
      subtotal: 472.73,
      iva: 47.27,
      total: 520.0,
      estado: "Pendiente",
      metodoPago: "Pendiente",
      productos: [{ nombre: "Lata Premium 250ml", cantidad: 20, precio: 12.75 }],
    },
    {
      id: 7,
      numero: "ALM-2024-007",
      cliente: "Supermercado Central",
      fecha: "2024-01-09",
      vencimiento: "2024-02-08",
      subtotal: 1022.73,
      iva: 102.27,
      total: 1125.0,
      estado: "Vencida",
      metodoPago: "Pendiente",
      productos: [{ nombre: "Aceite Virgen Extra 500ml", cantidad: 30, precio: 15.5 }],
    },
    {
      id: 8,
      numero: "ALM-2024-008",
      cliente: "Restaurante Mediterráneo",
      fecha: "2024-01-08",
      vencimiento: "2024-02-07",
      subtotal: 509.09,
      iva: 50.91,
      total: 560.0,
      estado: "Cancelada",
      metodoPago: "Cancelado",
      productos: [{ nombre: "Garrafa 5L", cantidad: 8, precio: 68.0 }],
    },
  ])

  const [newFactura, setNewFactura] = useState({
    cliente: "",
    fecha: new Date(),
    vencimiento: new Date(),
    metodoPago: "",
    productos: [{ producto: "", cantidad: 1, precio: 0 }],
    notas: "",
  })
  const [isNewFacturaDialogOpen, setIsNewFacturaDialogOpen] = useState(false)
  const [productosDisponibles] = useState([
    { id: "aceite-500ml", nombre: "Aceite Virgen Extra 500ml", precio: 15.5 },
    { id: "garrafa-5l", nombre: "Garrafa 5L", precio: 68.0 },
    { id: "lata-250ml", nombre: "Lata Premium 250ml", precio: 12.75 },
    { id: "aceite-750ml", nombre: "Aceite Ecológico Bio 750ml", precio: 22.9 },
    { id: "bag-3l", nombre: "Bag in Box Profesional 3L", precio: 45.5 },
  ])

  // Agregar estas funciones
  const handleView = (factura: any) => {
    setSelectedFactura(factura)
    setIsViewDialogOpen(true)
  }

  const handleDownloadPDF = (factura: any) => {
    // Simular descarga de PDF
    alert(`Descargando PDF de la factura ${factura.numero}`)
  }

  const handlePrint = (factura: any) => {
    // Simular impresión
    alert(`Imprimiendo factura ${factura.numero}`)
  }

  const handleSendEmail = (factura: any) => {
    // Simular envío por email
    alert(`Enviando factura ${factura.numero} por email a ${factura.cliente}`)
  }

  const handleEdit = (factura: any) => {
    alert(`Editando factura ${factura.numero}`)
  }

  const handleAddProducto = () => {
    setNewFactura((prev) => ({
      ...prev,
      productos: [...prev.productos, { producto: "", cantidad: 1, precio: 0 }],
    }))
  }

  const handleRemoveProducto = (index: number) => {
    setNewFactura((prev) => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index),
    }))
  }

  const handleProductoChange = (index: number, field: string, value: any) => {
    setNewFactura((prev) => ({
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

  const calcularTotales = () => {
    const subtotal = newFactura.productos.reduce((sum, p) => sum + p.cantidad * p.precio, 0)
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

  const handleCreateFactura = () => {
    const { subtotal, iva, total } = calcularTotales()
    const nuevaFactura = {
      id: facturas.length + 1,
      numero: `ALM-2024-${(facturas.length + 1).toString().padStart(3, "0")}`,
      cliente: newFactura.cliente,
      fecha: newFactura.fecha.toISOString().split("T")[0],
      vencimiento: newFactura.vencimiento.toISOString().split("T")[0],
      subtotal,
      iva,
      total,
      estado: "Pendiente",
      metodoPago: newFactura.metodoPago,
      productos: newFactura.productos.map((p) => {
        const producto = productosDisponibles.find((prod) => prod.id === p.producto)
        return {
          nombre: producto?.nombre || "",
          cantidad: p.cantidad,
          precio: p.precio,
        }
      }),
    }

    setFacturas((prev) => [...prev, nuevaFactura])
    setNewFactura({
      cliente: "",
      fecha: new Date(),
      vencimiento: new Date(),
      metodoPago: "",
      productos: [{ producto: "", cantidad: 1, precio: 0 }],
      notas: "",
    })
    setIsNewFacturaDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pagada":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Vencida":
        return "bg-red-100 text-red-800"
      case "Cancelada":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalFacturado = facturas.reduce((sum, factura) => sum + factura.total, 0)
  const facturasPendientes = facturas.filter((f) => f.estado === "Pendiente").length
  const facturasVencidas = facturas.filter((f) => f.estado === "Vencida").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Facturas</h1>
          <p className="text-gray-600 mt-1">Administra la facturación y cobros</p>
        </div>
        <Dialog open={isNewFacturaDialogOpen} onOpenChange={setIsNewFacturaDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Factura
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nueva Factura</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select
                    value={newFactura.cliente}
                    onValueChange={(value) => setNewFactura((prev) => ({ ...prev, cliente: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Restaurante El Olivo">Restaurante El Olivo</SelectItem>
                      <SelectItem value="Supermercados García">Supermercados García</SelectItem>
                      <SelectItem value="Hotel Majestic">Hotel Majestic</SelectItem>
                      <SelectItem value="Distribuidora Andaluza">Distribuidora Andaluza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fecha de Factura</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newFactura.fecha && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newFactura.fecha ? formatDate(newFactura.fecha) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newFactura.fecha}
                        onSelect={(date) => date && setNewFactura((prev) => ({ ...prev, fecha: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Vencimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newFactura.vencimiento && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newFactura.vencimiento ? formatDate(newFactura.vencimiento) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newFactura.vencimiento}
                        onSelect={(date) => date && setNewFactura((prev) => ({ ...prev, vencimiento: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="metodo-pago">Método de Pago</Label>
                  <Select
                    value={newFactura.metodoPago}
                    onValueChange={(value) => setNewFactura((prev) => ({ ...prev, metodoPago: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Transferencia">Transferencia</SelectItem>
                      <SelectItem value="Efectivo">Efectivo</SelectItem>
                      <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-semibold">Productos</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddProducto}>
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

                  {newFactura.productos.map((producto, index) => (
                    <div key={index} className="grid grid-cols-5 gap-2 items-center">
                      <Select
                        value={producto.producto}
                        onValueChange={(value) => handleProductoChange(index, "producto", value)}
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
                        onChange={(e) => handleProductoChange(index, "cantidad", Number.parseInt(e.target.value) || 1)}
                      />

                      <Input
                        type="number"
                        step="0.01"
                        value={producto.precio}
                        onChange={(e) => handleProductoChange(index, "precio", Number.parseFloat(e.target.value) || 0)}
                      />

                      <div className="font-medium">€{(producto.cantidad * producto.precio).toFixed(2)}</div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProducto(index)}
                        disabled={newFactura.productos.length === 1}
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
                  <div className="text-lg font-semibold">€{calcularTotales().subtotal.toFixed(2)}</div>
                </div>
                <div>
                  <Label>IVA (10%)</Label>
                  <div className="text-lg font-semibold">€{calcularTotales().iva.toFixed(2)}</div>
                </div>
                <div>
                  <Label>Total</Label>
                  <div className="text-xl font-bold text-[#708238]">€{calcularTotales().total.toFixed(2)}</div>
                </div>
              </div>

              <div>
                <Label htmlFor="notas">Notas</Label>
                <Textarea
                  id="notas"
                  placeholder="Notas adicionales para la factura"
                  value={newFactura.notas}
                  onChange={(e) => setNewFactura((prev) => ({ ...prev, notas: e.target.value }))}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateFactura} className="flex-1 bg-[#708238] hover:bg-[#5a6b2d]">
                  Crear Factura
                </Button>
                <Button variant="outline" onClick={() => setIsNewFacturaDialogOpen(false)}>
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
            <CardTitle className="text-sm font-medium text-gray-600">Total Facturado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€{totalFacturado.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1">Este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Facturas Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{facturasPendientes}</div>
            <p className="text-xs text-yellow-600 mt-1">Requieren seguimiento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Facturas Vencidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{facturasVencidas}</div>
            <p className="text-xs text-red-600 mt-1">Requieren atención urgente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio Factura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€{(totalFacturado / facturas.length).toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1">Por factura</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#708238]" />
            Lista de Facturas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por número, cliente..."
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
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="pagada">Pagada</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="vencida">Vencida</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes">Este mes</SelectItem>
                <SelectItem value="trimestre">Este trimestre</SelectItem>
                <SelectItem value="año">Este año</SelectItem>
                <SelectItem value="personalizado">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facturas.map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell className="font-medium">{factura.numero}</TableCell>
                  <TableCell>{factura.cliente}</TableCell>
                  <TableCell>{new Date(factura.fecha).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>{new Date(factura.vencimiento).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell className="font-medium">€{factura.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(factura.estado)}>{factura.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(factura)} title="Ver detalle">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(factura)}
                        title="Descargar PDF"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handlePrint(factura)} title="Imprimir">
                        <Printer className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSendEmail(factura)}
                        title="Enviar por email"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(factura)} title="Editar">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resumen de Facturación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="w-5 h-5 text-[#708238]" />
              Resumen de Cobros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Facturas Pagadas</span>
                <span className="font-bold text-green-600">€2,360.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium">Facturas Pendientes</span>
                <span className="font-bold text-yellow-600">€3,355.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">Facturas Vencidas</span>
                <span className="font-bold text-red-600">€2,015.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Generar Reporte de Facturación
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Send className="w-4 h-4 mr-2" />
                Enviar Recordatorios de Pago
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Exportar Facturas a Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Modal Ver Factura */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Factura {selectedFactura?.numero}</DialogTitle>
          </DialogHeader>
          {selectedFactura && (
            <div className="space-y-6">
              <div className="bg-white p-6 border rounded-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">FACTURA</h2>
                    <p className="text-gray-600">Número: {selectedFactura.numero}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold">Almazara San Miguel S.L.</h3>
                    <p className="text-sm text-gray-600">Carretera de Úbeda, Km 12.5</p>
                    <p className="text-sm text-gray-600">23440 Baeza, Jaén</p>
                    <p className="text-sm text-gray-600">CIF: B-23456789</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Facturar a:</h4>
                    <p className="font-medium">{selectedFactura.cliente}</p>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p>
                          <span className="font-medium">Fecha:</span>{" "}
                          {new Date(selectedFactura.fecha).toLocaleDateString("es-ES")}
                        </p>
                        <p>
                          <span className="font-medium">Vencimiento:</span>{" "}
                          {new Date(selectedFactura.vencimiento).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">Estado:</span>{" "}
                          <Badge className={getStatusColor(selectedFactura.estado)}>{selectedFactura.estado}</Badge>
                        </p>
                        <p>
                          <span className="font-medium">Método de pago:</span> {selectedFactura.metodoPago}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Cantidad</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Precio Unit.</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFactura.productos.map((producto: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{producto.cantidad}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">€{producto.precio.toFixed(2)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            €{(producto.cantidad * producto.precio).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-1">
                      <span>Subtotal:</span>
                      <span>€{selectedFactura.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>IVA (10%):</span>
                      <span>€{selectedFactura.iva.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t font-bold text-lg">
                      <span>Total:</span>
                      <span>€{selectedFactura.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleDownloadPDF(selectedFactura)} className="bg-[#708238] hover:bg-[#5a6b2d]">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button variant="outline" onClick={() => handlePrint(selectedFactura)}>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" onClick={() => handleSendEmail(selectedFactura)}>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
