"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Search,
  Plus,
  Users,
  TrendingUp,
  Euro,
  Phone,
  Mail,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("todos")
  const [selectedCliente, setSelectedCliente] = useState<any>(null)
  const [editingCliente, setEditingCliente] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewClienteDialogOpen, setIsNewClienteDialogOpen] = useState(false)

  const [newCliente, setNewCliente] = useState({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    tipo: "",
    notas: "",
  })

  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Restaurante El Olivo",
      contacto: "María García",
      email: "maria@elolivo.com",
      telefono: "+34 954 123 456",
      direccion: "Calle Mayor 15, Sevilla",
      tipo: "Restaurante",
      estado: "Activo",
      ultimoPedido: "2024-01-15",
      totalFacturado: 12450,
      pedidosRealizados: 28,
      descuento: 5,
      fechaRegistro: "2023-03-15",
      notas: "Cliente preferente, pago puntual",
    },
    {
      id: 2,
      nombre: "Supermercados García",
      contacto: "Juan García",
      email: "compras@supermercadosgarcia.es",
      telefono: "+34 955 987 654",
      direccion: "Polígono Industrial Norte, Córdoba",
      tipo: "Distribuidor",
      estado: "Activo",
      ultimoPedido: "2024-01-12",
      totalFacturado: 45680,
      pedidosRealizados: 156,
      descuento: 12,
      fechaRegistro: "2022-08-20",
      notas: "Pedidos grandes, entrega en almacén",
    },
    {
      id: 3,
      nombre: "Hotel Majestic",
      contacto: "Ana Rodríguez",
      email: "ana.rodriguez@hotelmajestic.com",
      telefono: "+34 957 456 789",
      direccion: "Avenida de la Constitución 45, Málaga",
      tipo: "Hotel",
      estado: "Activo",
      ultimoPedido: "2024-01-10",
      totalFacturado: 8920,
      pedidosRealizados: 15,
      descuento: 8,
      fechaRegistro: "2023-01-20",
      notas: "Hotel de 4 estrellas, pedidos regulares",
    },
    {
      id: 4,
      nombre: "Distribuidora Andaluza",
      contacto: "Carlos Martín",
      email: "carlos@distribuidoraandaluza.com",
      telefono: "+34 958 321 654",
      direccion: "Calle Industria 23, Granada",
      tipo: "Distribuidor",
      estado: "Activo",
      ultimoPedido: "2024-01-08",
      totalFacturado: 67890,
      pedidosRealizados: 89,
      descuento: 15,
      fechaRegistro: "2022-05-10",
      notas: "Distribuidor mayorista, excelente relación comercial",
    },
    {
      id: 5,
      nombre: "Restaurante La Aceituna",
      contacto: "Isabel López",
      email: "isabel@laaceituna.es",
      telefono: "+34 956 789 123",
      direccion: "Plaza del Aceite 8, Jaén",
      tipo: "Restaurante",
      estado: "Inactivo",
      ultimoPedido: "2023-12-20",
      totalFacturado: 3450,
      pedidosRealizados: 12,
      descuento: 3,
      fechaRegistro: "2023-06-12",
      notas: "Cliente inactivo desde diciembre",
    },
    {
      id: 6,
      nombre: "Cooperativa San José",
      contacto: "Francisco Ruiz",
      email: "francisco@coopsanjose.com",
      telefono: "+34 953 654 987",
      direccion: "Camino Rural km 5, Úbeda",
      tipo: "Cooperativa",
      estado: "Activo",
      ultimoPedido: "2024-01-14",
      totalFacturado: 23780,
      pedidosRealizados: 45,
      descuento: 10,
      fechaRegistro: "2021-10-10",
      notas: "Cooperativa local, servicios de maquila también",
    },
    {
      id: 7,
      nombre: "Tienda Gourmet Sevilla",
      contacto: "Carmen Jiménez",
      email: "carmen@gourmetsevillla.com",
      telefono: "+34 954 147 258",
      direccion: "Calle Sierpes 67, Sevilla",
      tipo: "Tienda",
      estado: "Activo",
      ultimoPedido: "2024-01-13",
      totalFacturado: 5670,
      pedidosRealizados: 23,
      descuento: 6,
      fechaRegistro: "2023-09-05",
      notas: "Tienda especializada en productos gourmet",
    },
    {
      id: 8,
      nombre: "Hotel Los Olivos",
      contacto: "Miguel Fernández",
      email: "miguel@hotellosolivos.es",
      telefono: "+34 957 369 741",
      direccion: "Carretera Nacional 340 km 15, Antequera",
      tipo: "Hotel",
      estado: "Pendiente",
      ultimoPedido: "2024-01-05",
      totalFacturado: 15420,
      pedidosRealizados: 34,
      descuento: 7,
      fechaRegistro: "2023-11-15",
      notas: "Nuevo cliente, en proceso de validación",
    },
  ])

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch =
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "todos" || cliente.tipo.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesFilter
  })

  // Calcular estadísticas
  const totalClientes = clientes.length
  const clientesActivos = clientes.filter((c) => c.estado === "Activo").length
  const totalFacturado = clientes.reduce((sum, c) => sum + c.totalFacturado, 0)
  const ticketPromedio = totalFacturado / clientes.reduce((sum, c) => sum + c.pedidosRealizados, 0)

  const stats = [
    {
      title: "Total Clientes",
      value: totalClientes.toString(),
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      description: "Registrados",
    },
    {
      title: "Clientes Activos",
      value: clientesActivos.toString(),
      change: "+8.3%",
      icon: TrendingUp,
      color: "text-green-600",
      description: "Este mes",
    },
    {
      title: "Facturación Total",
      value: `€${totalFacturado.toLocaleString()}`,
      change: "+15.7%",
      icon: Euro,
      color: "text-purple-600",
      description: "Acumulado",
    },
    {
      title: "Ticket Promedio",
      value: `€${Math.round(ticketPromedio)}`,
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-orange-600",
      description: "Por pedido",
    },
  ]

  // Funciones de manejo
  const handleView = (cliente: any) => {
    setSelectedCliente(cliente)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (cliente: any) => {
    setEditingCliente({ ...cliente })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setClientes((prev) => prev.filter((cliente) => cliente.id !== id))
  }

  const handleSaveEdit = () => {
    setClientes((prev) => prev.map((cliente) => (cliente.id === editingCliente.id ? editingCliente : cliente)))
    setIsEditDialogOpen(false)
    setEditingCliente(null)
  }

  const handleCreateCliente = () => {
    const nuevoCliente = {
      id: clientes.length + 1,
      ...newCliente,
      estado: "Activo",
      ultimoPedido: "N/A",
      totalFacturado: 0,
      pedidosRealizados: 0,
      descuento: 0,
      fechaRegistro: new Date().toISOString().split("T")[0],
    }

    setClientes((prev) => [...prev, nuevoCliente])
    setNewCliente({
      nombre: "",
      contacto: "",
      email: "",
      telefono: "",
      direccion: "",
      tipo: "",
      notas: "",
    })
    setIsNewClienteDialogOpen(false)
  }

  const handleDownloadReport = (cliente: any) => {
    const reportData = `
REPORTE DE CLIENTE
==================
Cliente: ${cliente.nombre}
Contacto: ${cliente.contacto}
Email: ${cliente.email}
Teléfono: ${cliente.telefono}
Dirección: ${cliente.direccion}
Tipo: ${cliente.tipo}
Estado: ${cliente.estado}
Fecha de registro: ${new Date(cliente.fechaRegistro).toLocaleDateString("es-ES")}
Total facturado: €${cliente.totalFacturado.toLocaleString()}
Pedidos realizados: ${cliente.pedidosRealizados}
Último pedido: ${cliente.ultimoPedido}
Descuento aplicado: ${cliente.descuento}%
Notas: ${cliente.notas}

Generado el: ${new Date().toLocaleDateString("es-ES")}
    `

    const blob = new Blob([reportData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cliente-${cliente.nombre.replace(/\s+/g, "-")}-${cliente.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleGenerateContract = (cliente: any) => {
    alert(`Generando contrato para ${cliente.nombre}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-600 mt-1">Administra tu cartera de clientes</p>
        </div>
        <Dialog open={isNewClienteDialogOpen} onOpenChange={setIsNewClienteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre/Empresa *</Label>
                  <Input
                    id="nombre"
                    placeholder="Nombre del cliente"
                    value={newCliente.nombre}
                    onChange={(e) => setNewCliente((prev) => ({ ...prev, nombre: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contacto">Persona de Contacto *</Label>
                  <Input
                    id="contacto"
                    placeholder="Nombre del contacto"
                    value={newCliente.contacto}
                    onChange={(e) => setNewCliente((prev) => ({ ...prev, contacto: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={newCliente.email}
                    onChange={(e) => setNewCliente((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    placeholder="+34 666 123 456"
                    value={newCliente.telefono}
                    onChange={(e) => setNewCliente((prev) => ({ ...prev, telefono: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  placeholder="Dirección completa"
                  value={newCliente.direccion}
                  onChange={(e) => setNewCliente((prev) => ({ ...prev, direccion: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo de Cliente *</Label>
                <Select
                  value={newCliente.tipo}
                  onValueChange={(value) => setNewCliente((prev) => ({ ...prev, tipo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Restaurante">Restaurante</SelectItem>
                    <SelectItem value="Distribuidor">Distribuidor</SelectItem>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Tienda">Tienda</SelectItem>
                    <SelectItem value="Cooperativa">Cooperativa</SelectItem>
                    <SelectItem value="Particular">Particular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notas">Notas</Label>
                <Textarea
                  id="notas"
                  placeholder="Notas adicionales sobre el cliente"
                  value={newCliente.notas}
                  onChange={(e) => setNewCliente((prev) => ({ ...prev, notas: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleCreateCliente}
                  className="flex-1 bg-[#708238] hover:bg-[#5a6b2d]"
                  disabled={
                    !newCliente.nombre ||
                    !newCliente.contacto ||
                    !newCliente.email ||
                    !newCliente.telefono ||
                    !newCliente.tipo
                  }
                >
                  Crear Cliente
                </Button>
                <Button variant="outline" onClick={() => setIsNewClienteDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-[#708238]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} desde el mes pasado</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clientes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#708238]" />
            Lista de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "todos" ? "default" : "outline"}
                onClick={() => setFilterType("todos")}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterType === "restaurante" ? "default" : "outline"}
                onClick={() => setFilterType("restaurante")}
                size="sm"
              >
                Restaurantes
              </Button>
              <Button
                variant={filterType === "distribuidor" ? "default" : "outline"}
                onClick={() => setFilterType("distribuidor")}
                size="sm"
              >
                Distribuidores
              </Button>
              <Button
                variant={filterType === "hotel" ? "default" : "outline"}
                onClick={() => setFilterType("hotel")}
                size="sm"
              >
                Hoteles
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[200px]">Cliente</th>
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[180px]">Contacto</th>
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[120px]">Tipo</th>
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[100px]">Estado</th>
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[120px]">Facturación</th>
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[100px]">Pedidos</th>
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[80px]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">{cliente.nombre}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{cliente.direccion}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{cliente.contacto}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{cliente.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span>{cliente.telefono}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {cliente.tipo}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          cliente.estado === "Activo"
                            ? "default"
                            : cliente.estado === "Inactivo"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {cliente.estado}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">€{cliente.totalFacturado.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{cliente.descuento}% descuento</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">{cliente.pedidosRealizados}</div>
                        <div className="text-sm text-gray-500">Último: {cliente.ultimoPedido}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(cliente)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(cliente)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadReport(cliente)}>
                            <Download className="w-4 h-4 mr-2" />
                            Descargar reporte
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenerateContract(cliente)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Generar contrato
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente el cliente{" "}
                                  {cliente.nombre}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(cliente.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClientes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron clientes</p>
              <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Ver Detalles */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
          </DialogHeader>
          {selectedCliente && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Información General</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Nombre:</span> {selectedCliente.nombre}
                    </p>
                    <p>
                      <span className="font-medium">Contacto:</span> {selectedCliente.contacto}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{selectedCliente.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{selectedCliente.telefono}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedCliente.direccion}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Información Comercial</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Tipo:</span> <Badge variant="outline">{selectedCliente.tipo}</Badge>
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span>{" "}
                      <Badge
                        variant={
                          selectedCliente.estado === "Activo"
                            ? "default"
                            : selectedCliente.estado === "Inactivo"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {selectedCliente.estado}
                      </Badge>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Registrado: {new Date(selectedCliente.fechaRegistro).toLocaleDateString("es-ES")}</span>
                    </p>
                    <p>
                      <span className="font-medium">Descuento:</span> {selectedCliente.descuento}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    €{selectedCliente.totalFacturado.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total Facturado</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedCliente.pedidosRealizados}</div>
                  <p className="text-sm text-gray-600">Pedidos Realizados</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedCliente.ultimoPedido !== "N/A"
                      ? new Date(selectedCliente.ultimoPedido).toLocaleDateString("es-ES")
                      : "N/A"}
                  </div>
                  <p className="text-sm text-gray-600">Último Pedido</p>
                </div>
              </div>

              {selectedCliente.notas && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notas</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedCliente.notas}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleDownloadReport(selectedCliente)}
                  className="bg-[#708238] hover:bg-[#5a6b2d]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
                </Button>
                <Button variant="outline" onClick={() => handleGenerateContract(selectedCliente)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generar Contrato
                </Button>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
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
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          {editingCliente && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-nombre">Nombre/Empresa</Label>
                  <Input
                    id="edit-nombre"
                    value={editingCliente.nombre}
                    onChange={(e) => setEditingCliente({ ...editingCliente, nombre: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-contacto">Contacto</Label>
                  <Input
                    id="edit-contacto"
                    value={editingCliente.contacto}
                    onChange={(e) => setEditingCliente({ ...editingCliente, contacto: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingCliente.email}
                    onChange={(e) => setEditingCliente({ ...editingCliente, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-telefono">Teléfono</Label>
                  <Input
                    id="edit-telefono"
                    value={editingCliente.telefono}
                    onChange={(e) => setEditingCliente({ ...editingCliente, telefono: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-direccion">Dirección</Label>
                <Input
                  id="edit-direccion"
                  value={editingCliente.direccion}
                  onChange={(e) => setEditingCliente({ ...editingCliente, direccion: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-tipo">Tipo</Label>
                  <Select
                    value={editingCliente.tipo}
                    onValueChange={(value) => setEditingCliente({ ...editingCliente, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Restaurante">Restaurante</SelectItem>
                      <SelectItem value="Distribuidor">Distribuidor</SelectItem>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Tienda">Tienda</SelectItem>
                      <SelectItem value="Cooperativa">Cooperativa</SelectItem>
                      <SelectItem value="Particular">Particular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-estado">Estado</Label>
                  <Select
                    value={editingCliente.estado}
                    onValueChange={(value) => setEditingCliente({ ...editingCliente, estado: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-descuento">Descuento (%)</Label>
                <Input
                  id="edit-descuento"
                  type="number"
                  min="0"
                  max="100"
                  value={editingCliente.descuento}
                  onChange={(e) =>
                    setEditingCliente({ ...editingCliente, descuento: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-notas">Notas</Label>
                <Textarea
                  id="edit-notas"
                  value={editingCliente.notas}
                  onChange={(e) => setEditingCliente({ ...editingCliente, notas: e.target.value })}
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

      {/* Resumen por Tipo de Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen por Tipo de Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Restaurante", "Distribuidor", "Hotel", "Tienda"].map((tipo) => {
              const clientesTipo = clientes.filter((c) => c.tipo === tipo)
              const totalTipo = clientesTipo.reduce((sum, c) => sum + c.totalFacturado, 0)
              const count = clientesTipo.length

              return (
                <div key={tipo} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <p className="text-sm text-gray-600">{tipo}s</p>
                  <p className="text-xs text-gray-500 mt-1">€{totalTipo.toLocaleString()} facturado</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
