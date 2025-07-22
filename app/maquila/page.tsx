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
import { Plus, Search, Eye, Edit, Download, Trash2, Droplets, TrendingUp, Users, Package } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MaquilaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [editingEntry, setEditingEntry] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [newEntry, setNewEntry] = useState({
    cliente: "",
    contacto: "",
    telefono: "",
    kilos: 0,
    variedad: "",
    fecha: new Date(),
    precioKilo: 0,
    ubicacionTanque: "",
    notas: "",
  })
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false)

  const [maquilaEntries, setMaquilaEntries] = useState([
    {
      id: 1,
      cliente: "Finca Los Remedios",
      contacto: "Antonio Ruiz",
      telefono: "+34 666 345 678",
      kilos: 1250,
      variedad: "Picual",
      litrosObtenidos: 312,
      rendimiento: 24.96,
      fecha: "2024-01-15",
      fechaProcesamiento: "2024-01-16",
      estado: "Completado",
      notas: "Aceituna de excelente calidad, cosecha temprana",
      ubicacionTanque: "Tanque A-3",
      precioKilo: 0.85,
      totalFacturado: 1062.5,
    },
    {
      id: 2,
      cliente: "Olivar San José",
      contacto: "María González",
      telefono: "+34 666 123 456",
      kilos: 850,
      variedad: "Hojiblanca",
      litrosObtenidos: 195,
      rendimiento: 22.94,
      fecha: "2024-01-14",
      fechaProcesamiento: "2024-01-15",
      estado: "En Proceso",
      notas: "Procesamiento en curso, estimación 24 horas",
      ubicacionTanque: "Tanque B-1",
      precioKilo: 0.8,
      totalFacturado: 680.0,
    },
    {
      id: 3,
      cliente: "Cooperativa El Olivo",
      contacto: "Juan García",
      telefono: "+34 666 789 012",
      kilos: 2100,
      variedad: "Arbequina",
      litrosObtenidos: 420,
      rendimiento: 20.0,
      fecha: "2024-01-13",
      fechaProcesamiento: "2024-01-14",
      estado: "Completado",
      notas: "Lote grande, procesamiento en dos tandas",
      ubicacionTanque: "Tanque A-1, A-2",
      precioKilo: 0.75,
      totalFacturado: 1575.0,
    },
    {
      id: 4,
      cliente: "Finca Santa María",
      contacto: "Carmen López",
      telefono: "+34 666 456 789",
      kilos: 1680,
      variedad: "Cornicabra",
      litrosObtenidos: 378,
      rendimiento: 22.5,
      fecha: "2024-01-12",
      fechaProcesamiento: "2024-01-13",
      estado: "Completado",
      notas: "Variedad autóctona, sabor intenso",
      ubicacionTanque: "Tanque C-2",
      precioKilo: 0.82,
      totalFacturado: 1377.6,
    },
    {
      id: 5,
      cliente: "Olivar Los Llanos",
      contacto: "Francisco Martín",
      telefono: "+34 666 567 890",
      kilos: 920,
      variedad: "Picual",
      litrosObtenidos: 201,
      rendimiento: 21.8,
      fecha: "2024-01-11",
      fechaProcesamiento: "2024-01-12",
      estado: "En Proceso",
      notas: "Esperando análisis de calidad",
      ubicacionTanque: "Tanque B-3",
      precioKilo: 0.85,
      totalFacturado: 782.0,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800"
      case "En Proceso":
        return "bg-yellow-100 text-yellow-800"
      case "Pendiente":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleView = (entry: any) => {
    setSelectedEntry(entry)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (entry: any) => {
    setEditingEntry({ ...entry })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setMaquilaEntries((entries) => entries.map((entry) => (entry.id === editingEntry.id ? editingEntry : entry)))
    setIsEditDialogOpen(false)
    setEditingEntry(null)
  }

  const handleDelete = (id: number) => {
    setMaquilaEntries((entries) => entries.filter((entry) => entry.id !== id))
  }

  const handleDownload = (entry: any) => {
    // Simular descarga de reporte
    const reportData = `
REPORTE DE MAQUILA
==================
Cliente: ${entry.cliente}
Contacto: ${entry.contacto}
Teléfono: ${entry.telefono}
Fecha de entrada: ${new Date(entry.fecha).toLocaleDateString("es-ES")}
Kilos procesados: ${entry.kilos} kg
Variedad: ${entry.variedad}
Litros obtenidos: ${entry.litrosObtenidos} L
Rendimiento: ${entry.rendimiento}%
Estado: ${entry.estado}
Ubicación: ${entry.ubicacionTanque}
Precio por kilo: €${entry.precioKilo}
Total facturado: €${entry.totalFacturado}
Notas: ${entry.notas}
    `

    const blob = new Blob([reportData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `maquila-${entry.cliente.replace(/\s+/g, "-")}-${entry.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calcular estadísticas
  const totalKilosProcesados = maquilaEntries.reduce((sum, entry) => sum + entry.kilos, 0)
  const totalLitrosObtenidos = maquilaEntries.reduce((sum, entry) => sum + entry.litrosObtenidos, 0)
  const rendimientoPromedio = maquilaEntries.reduce((sum, entry) => sum + entry.rendimiento, 0) / maquilaEntries.length
  const entradasActivas = maquilaEntries.filter((entry) => entry.estado === "En Proceso").length
  const totalFacturado = maquilaEntries.reduce((sum, entry) => sum + entry.totalFacturado, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Maquila</h1>
          <p className="text-gray-600 mt-1">Procesamiento de aceituna de clientes - Campaña 2024</p>
        </div>
        <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Entrada
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nueva Entrada de Maquila</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select
                    value={newEntry.cliente}
                    onValueChange={(value) => setNewEntry((prev) => ({ ...prev, cliente: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Finca Los Remedios">Finca Los Remedios</SelectItem>
                      <SelectItem value="Olivar San José">Olivar San José</SelectItem>
                      <SelectItem value="Cooperativa El Olivo">Cooperativa El Olivo</SelectItem>
                      <SelectItem value="Finca Santa María">Finca Santa María</SelectItem>
                      <SelectItem value="Olivar Los Llanos">Olivar Los Llanos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contacto">Contacto</Label>
                  <Input
                    id="contacto"
                    placeholder="Nombre del contacto"
                    value={newEntry.contacto || ""}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, contacto: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    placeholder="+34 666 123 456"
                    value={newEntry.telefono || ""}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, telefono: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="variedad">Variedad</Label>
                  <Select
                    value={newEntry.variedad}
                    onValueChange={(value) => setNewEntry((prev) => ({ ...prev, variedad: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar variedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Picual">Picual</SelectItem>
                      <SelectItem value="Hojiblanca">Hojiblanca</SelectItem>
                      <SelectItem value="Arbequina">Arbequina</SelectItem>
                      <SelectItem value="Cornicabra">Cornicabra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kilos">Kilos de Aceituna</Label>
                  <Input
                    id="kilos"
                    type="number"
                    placeholder="0"
                    value={newEntry.kilos || ""}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, kilos: Number.parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="precioKilo">Precio por Kilo (€)</Label>
                  <Input
                    id="precioKilo"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newEntry.precioKilo || ""}
                    onChange={(e) =>
                      setNewEntry((prev) => ({ ...prev, precioKilo: Number.parseFloat(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Entrada</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newEntry.fecha && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEntry.fecha ? formatDate(newEntry.fecha) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newEntry.fecha}
                        onSelect={(date) => date && setNewEntry((prev) => ({ ...prev, fecha: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="ubicacionTanque">Ubicación del Tanque</Label>
                  <Select
                    value={newEntry.ubicacionTanque || ""}
                    onValueChange={(value) => setNewEntry((prev) => ({ ...prev, ubicacionTanque: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tanque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tanque A-1">Tanque A-1</SelectItem>
                      <SelectItem value="Tanque A-2">Tanque A-2</SelectItem>
                      <SelectItem value="Tanque A-3">Tanque A-3</SelectItem>
                      <SelectItem value="Tanque B-1">Tanque B-1</SelectItem>
                      <SelectItem value="Tanque B-2">Tanque B-2</SelectItem>
                      <SelectItem value="Tanque B-3">Tanque B-3</SelectItem>
                      <SelectItem value="Tanque C-1">Tanque C-1</SelectItem>
                      <SelectItem value="Tanque C-2">Tanque C-2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notas">Notas y Observaciones</Label>
                <Input
                  id="notas"
                  placeholder="Observaciones sobre la calidad, estado, etc."
                  value={newEntry.notas || ""}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, notas: e.target.value }))}
                />
              </div>

              <Button
                className="w-full bg-[#708238] hover:bg-[#5a6b2d]"
                onClick={() => {
                  if (!newEntry.cliente || !newEntry.kilos || !newEntry.variedad) {
                    alert("Por favor, completa los campos obligatorios: Cliente, Kilos y Variedad")
                    return
                  }

                  const newId = Math.max(...maquilaEntries.map((e) => e.id)) + 1
                  const totalFacturado = newEntry.kilos * (newEntry.precioKilo || 0.8)

                  const nuevaEntrada = {
                    id: newId,
                    cliente: newEntry.cliente,
                    contacto: newEntry.contacto || "Sin especificar",
                    telefono: newEntry.telefono || "Sin especificar",
                    kilos: newEntry.kilos,
                    variedad: newEntry.variedad,
                    litrosObtenidos: 0, // Se calculará después del procesamiento
                    rendimiento: 0, // Se calculará después del procesamiento
                    fecha: newEntry.fecha.toISOString().split("T")[0],
                    fechaProcesamiento: new Date().toISOString().split("T")[0],
                    estado: "Pendiente",
                    notas: newEntry.notas || "Sin observaciones",
                    ubicacionTanque: newEntry.ubicacionTanque || "Por asignar",
                    precioKilo: newEntry.precioKilo || 0.8,
                    totalFacturado: totalFacturado,
                  }

                  setMaquilaEntries((prev) => [...prev, nuevaEntrada])
                  setIsNewEntryDialogOpen(false)
                  setNewEntry({
                    cliente: "",
                    contacto: "",
                    telefono: "",
                    kilos: 0,
                    variedad: "",
                    fecha: new Date(),
                    precioKilo: 0,
                    ubicacionTanque: "",
                    notas: "",
                  })
                }}
              >
                Registrar Entrada
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Total Kilos Procesados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalKilosProcesados.toLocaleString()} kg</div>
            <p className="text-xs text-green-600 mt-1">+22% este mes</p>
            <p className="text-xs text-gray-500">Campaña 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Litros Obtenidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalLitrosObtenidos.toLocaleString()} L</div>
            <p className="text-xs text-green-600 mt-1">+18% este mes</p>
            <p className="text-xs text-gray-500">De {totalKilosProcesados.toLocaleString()} kg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Rendimiento Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{rendimientoPromedio.toFixed(1)}%</div>
            <p className="text-xs text-gray-500 mt-1">Excelente calidad</p>
            <p className="text-xs text-green-600">Óptimo para la variedad</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Entradas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{entradasActivas}</div>
            <p className="text-xs text-yellow-600 mt-1">En proceso</p>
            <p className="text-xs text-gray-500">De {maquilaEntries.length} totales</p>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Facturación Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{totalFacturado.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Servicios de maquila</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Precio Promedio/Kg</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              €{(totalFacturado / totalKilosProcesados).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Servicio de procesamiento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clientes Únicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(maquilaEntries.map((e) => e.cliente)).size}
            </div>
            <p className="text-xs text-gray-500 mt-1">Este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Entradas de Maquila</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por cliente..."
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
                <SelectItem value="completado">Completado</SelectItem>
                <SelectItem value="proceso">En Proceso</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Kilos</TableHead>
                <TableHead>Variedad</TableHead>
                <TableHead>Litros</TableHead>
                <TableHead>Rendimiento</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maquilaEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.cliente}</TableCell>
                  <TableCell>{entry.kilos.toLocaleString()} kg</TableCell>
                  <TableCell>{entry.variedad}</TableCell>
                  <TableCell>{entry.litrosObtenidos} L</TableCell>
                  <TableCell>{entry.rendimiento.toFixed(2)}%</TableCell>
                  <TableCell>{new Date(entry.fecha).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(entry.estado)}>{entry.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(entry)} title="Ver detalles">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(entry)} title="Editar">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(entry)} title="Descargar reporte">
                        <Download className="w-4 h-4" />
                      </Button>
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
                              Esta acción no se puede deshacer. Se eliminará permanentemente la entrada de maquila de{" "}
                              {entry.cliente}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(entry.id)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de Entrada de Maquila</DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Información del Cliente</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Cliente:</span> {selectedEntry.cliente}
                    </p>
                    <p>
                      <span className="font-medium">Contacto:</span> {selectedEntry.contacto}
                    </p>
                    <p>
                      <span className="font-medium">Teléfono:</span> {selectedEntry.telefono}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Información del Procesamiento</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Fecha de entrada:</span>{" "}
                      {new Date(selectedEntry.fecha).toLocaleDateString("es-ES")}
                    </p>
                    <p>
                      <span className="font-medium">Fecha de procesamiento:</span>{" "}
                      {new Date(selectedEntry.fechaProcesamiento).toLocaleDateString("es-ES")}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span>{" "}
                      <Badge className={getStatusColor(selectedEntry.estado)}>{selectedEntry.estado}</Badge>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedEntry.kilos} kg</div>
                  <p className="text-sm text-gray-600">Kilos de {selectedEntry.variedad}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedEntry.litrosObtenidos} L</div>
                  <p className="text-sm text-gray-600">Litros obtenidos</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedEntry.rendimiento}%</div>
                  <p className="text-sm text-gray-600">Rendimiento</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Detalles Adicionales</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Ubicación del tanque:</span> {selectedEntry.ubicacionTanque}
                  </p>
                  <p>
                    <span className="font-medium">Precio por kilo:</span> €{selectedEntry.precioKilo}
                  </p>
                  <p>
                    <span className="font-medium">Total facturado:</span> €{selectedEntry.totalFacturado}
                  </p>
                  <p>
                    <span className="font-medium">Notas:</span> {selectedEntry.notas}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleDownload(selectedEntry)} className="bg-[#708238] hover:bg-[#5a6b2d]">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
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
            <DialogTitle>Editar Entrada de Maquila</DialogTitle>
          </DialogHeader>
          {editingEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-cliente">Cliente</Label>
                  <Input
                    id="edit-cliente"
                    value={editingEntry.cliente}
                    onChange={(e) => setEditingEntry({ ...editingEntry, cliente: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-contacto">Contacto</Label>
                  <Input
                    id="edit-contacto"
                    value={editingEntry.contacto}
                    onChange={(e) => setEditingEntry({ ...editingEntry, contacto: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-kilos">Kilos</Label>
                  <Input
                    id="edit-kilos"
                    type="number"
                    value={editingEntry.kilos}
                    onChange={(e) => setEditingEntry({ ...editingEntry, kilos: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-variedad">Variedad</Label>
                  <Select
                    value={editingEntry.variedad}
                    onValueChange={(value) => setEditingEntry({ ...editingEntry, variedad: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Picual">Picual</SelectItem>
                      <SelectItem value="Hojiblanca">Hojiblanca</SelectItem>
                      <SelectItem value="Arbequina">Arbequina</SelectItem>
                      <SelectItem value="Cornicabra">Cornicabra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-litros">Litros Obtenidos</Label>
                  <Input
                    id="edit-litros"
                    type="number"
                    value={editingEntry.litrosObtenidos}
                    onChange={(e) =>
                      setEditingEntry({ ...editingEntry, litrosObtenidos: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-estado">Estado</Label>
                  <Select
                    value={editingEntry.estado}
                    onValueChange={(value) => setEditingEntry({ ...editingEntry, estado: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="En Proceso">En Proceso</SelectItem>
                      <SelectItem value="Completado">Completado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-tanque">Ubicación del Tanque</Label>
                <Input
                  id="edit-tanque"
                  value={editingEntry.ubicacionTanque}
                  onChange={(e) => setEditingEntry({ ...editingEntry, ubicacionTanque: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-notas">Notas</Label>
                <Input
                  id="edit-notas"
                  value={editingEntry.notas}
                  onChange={(e) => setEditingEntry({ ...editingEntry, notas: e.target.value })}
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
