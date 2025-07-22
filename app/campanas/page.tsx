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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Eye, Edit, CalendarIcon, BarChart3, Droplets, Package, TrendingUp } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function CampanasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fechaInicio, setFechaInicio] = useState<Date>()
  const [fechaFin, setFechaFin] = useState<Date>()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const campanas = [
    {
      id: 1,
      nombre: "Campaña 2024",
      fechaInicio: "2024-10-01",
      fechaFin: "2024-03-31",
      estado: "Activa",
      kilosRecibidos: 67500,
      litrosProducidos: 14250,
      rendimientoPromedio: 21.1,
      clientesMaquila: 42,
      ventasRealizadas: 234000,
      objetivo: 300000,
      progreso: 78,
      diasRestantes: 45,
      variedadesProcesadas: ["Picual", "Hojiblanca", "Arbequina", "Cornicabra"],
      calidadPromedio: "Extra Virgen",
      temperaturaPromedio: 24.5,
    },
    {
      id: 2,
      nombre: "Campaña 2023",
      fechaInicio: "2023-10-01",
      fechaFin: "2024-03-31",
      estado: "Finalizada",
      kilosRecibidos: 78000,
      litrosProducidos: 16800,
      rendimientoPromedio: 21.5,
      clientesMaquila: 38,
      ventasRealizadas: 285000,
      objetivo: 280000,
      progreso: 100,
      diasRestantes: 0,
      variedadesProcesadas: ["Picual", "Hojiblanca", "Arbequina"],
      calidadPromedio: "Extra Virgen",
      temperaturaPromedio: 23.8,
    },
    {
      id: 3,
      nombre: "Campaña 2022",
      fechaInicio: "2022-10-01",
      fechaFin: "2023-03-31",
      estado: "Finalizada",
      kilosRecibidos: 72000,
      litrosProducidos: 15120,
      rendimientoPromedio: 21.0,
      clientesMaquila: 35,
      ventasRealizadas: 268000,
      objetivo: 260000,
      progreso: 100,
      diasRestantes: 0,
      variedadesProcesadas: ["Picual", "Hojiblanca"],
      calidadPromedio: "Extra Virgen",
      temperaturaPromedio: 25.2,
    },
    {
      id: 4,
      nombre: "Campaña 2021",
      fechaInicio: "2021-10-01",
      fechaFin: "2022-03-31",
      estado: "Finalizada",
      kilosRecibidos: 65000,
      litrosProducidos: 13650,
      rendimientoPromedio: 21.0,
      clientesMaquila: 32,
      ventasRealizadas: 245000,
      objetivo: 240000,
      progreso: 100,
      diasRestantes: 0,
      variedadesProcesadas: ["Picual", "Arbequina"],
      calidadPromedio: "Extra Virgen",
      temperaturaPromedio: 24.1,
    },
  ]

  const campanasActiva = campanas.find((c) => c.estado === "Activa")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activa":
        return "bg-green-100 text-green-800"
      case "Finalizada":
        return "bg-gray-100 text-gray-800"
      case "Planificada":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const actividadReciente = [
    {
      fecha: "2024-01-15",
      tipo: "Maquila",
      descripcion: "Entrada de 1,250 kg - Finca Los Remedios (Picual)",
      cantidad: "1,250 kg",
      rendimiento: "24.2%",
    },
    {
      fecha: "2024-01-14",
      tipo: "Venta",
      descripcion: "Pedido completado - Supermercados García (15 garrafas)",
      cantidad: "€2,150",
      cliente: "Supermercados García",
    },
    {
      fecha: "2024-01-13",
      tipo: "Maquila",
      descripcion: "Procesamiento completado - Olivar San José (Hojiblanca)",
      cantidad: "195 L",
      rendimiento: "22.9%",
    },
    {
      fecha: "2024-01-12",
      tipo: "Venta",
      descripcion: "Nueva venta - Hotel Majestic (35 latas premium)",
      cantidad: "€890",
      cliente: "Hotel Majestic",
    },
    {
      fecha: "2024-01-11",
      tipo: "Maquila",
      descripcion: "Entrada de 2,100 kg - Cooperativa El Olivo (Arbequina)",
      cantidad: "2,100 kg",
      rendimiento: "20.5%",
    },
    {
      fecha: "2024-01-10",
      tipo: "Venta",
      descripcion: "Pedido procesado - Distribuidora Andaluza (25 garrafas)",
      cantidad: "€1,680",
      cliente: "Distribuidora Andaluza",
    },
    {
      fecha: "2024-01-09",
      tipo: "Maquila",
      descripcion: "Procesamiento iniciado - Finca Santa María (Cornicabra)",
      cantidad: "1,680 kg",
      rendimiento: "22.8%",
    },
    {
      fecha: "2024-01-08",
      tipo: "Venta",
      descripcion: "Venta completada - Restaurante La Aceituna (12 botellas)",
      cantidad: "€425",
      cliente: "Restaurante La Aceituna",
    },
    {
      fecha: "2024-01-07",
      tipo: "Maquila",
      descripcion: "Entrada de 950 kg - Olivar Los Llanos (Picual)",
      cantidad: "950 kg",
      rendimiento: "21.8%",
    },
    {
      fecha: "2024-01-06",
      tipo: "Venta",
      descripcion: "Pedido urgente - Restaurante El Molino (8 garrafas)",
      cantidad: "€544",
      cliente: "Restaurante El Molino",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Campañas</h1>
          <p className="text-gray-600 mt-1">Control por temporadas de cosecha</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Campaña
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nueva Campaña</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre-campana">Nombre de la Campaña</Label>
                <Input id="nombre-campana" placeholder="Ej: Campaña 2025" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Inicio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fechaInicio && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fechaInicio ? formatDate(fechaInicio) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={fechaInicio} onSelect={setFechaInicio} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Fecha de Fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fechaFin && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fechaFin ? formatDate(fechaFin) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={fechaFin} onSelect={setFechaFin} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                <Label htmlFor="objetivo-ventas">Objetivo de Ventas (€)</Label>
                <Input id="objetivo-ventas" type="number" placeholder="200000" />
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea id="descripcion" placeholder="Descripción de la campaña" />
              </div>
              <Button className="w-full bg-[#708238] hover:bg-[#5a6b2d]">Crear Campaña</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaña Activa - Resumen */}
      {campanasActiva && (
        <Card className="border-l-4 border-l-[#708238]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#708238]" />
                {campanasActiva.nombre} - Campaña Activa
              </span>
              <Badge className={getStatusColor(campanasActiva.estado)}>{campanasActiva.estado}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {campanasActiva.kilosRecibidos.toLocaleString()} kg
                </div>
                <p className="text-sm text-gray-600">Kilos Recibidos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {campanasActiva.litrosProducidos.toLocaleString()} L
                </div>
                <p className="text-sm text-gray-600">Litros Producidos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{campanasActiva.rendimientoPromedio}%</div>
                <p className="text-sm text-gray-600">Rendimiento Promedio</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{campanasActiva.clientesMaquila}</div>
                <p className="text-sm text-gray-600">Clientes Maquila</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progreso de Ventas</span>
                <span className="text-sm text-gray-600">
                  €{campanasActiva.ventasRealizadas.toLocaleString()} / €{campanasActiva.objetivo.toLocaleString()}
                </span>
              </div>
              <Progress value={campanasActiva.progreso} className="h-2" />
              <p className="text-xs text-gray-500">{campanasActiva.progreso}% del objetivo alcanzado</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="resumen" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="campanas">Todas las Campañas</TabsTrigger>
          <TabsTrigger value="comparativa">Comparativa</TabsTrigger>
          <TabsTrigger value="actividad">Actividad</TabsTrigger>
        </TabsList>

        {/* Resumen Tab */}
        <TabsContent value="resumen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Estadísticas Generales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#708238]" />
                  Estadísticas de la Campaña Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Producción Total</span>
                    </div>
                    <span className="font-bold text-blue-600">14,250 L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Ventas Realizadas</span>
                    </div>
                    <span className="font-bold text-green-600">€234,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Rendimiento</span>
                    </div>
                    <span className="font-bold text-purple-600">21.1%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">Días Restantes</span>
                    </div>
                    <span className="font-bold text-orange-600">45 días</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de Progreso */}
            <Card>
              <CardHeader>
                <CardTitle>Progreso Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 p-4">
                  <div className="h-full flex items-end justify-between gap-2">
                    {[
                      { mes: "Oct", produccion: 2850, ventas: 18500 },
                      { mes: "Nov", produccion: 3200, ventas: 22000 },
                      { mes: "Dic", produccion: 2950, ventas: 19800 },
                      { mes: "Ene", produccion: 3100, ventas: 24500 },
                      { mes: "Feb", produccion: 2750, ventas: 21200 },
                      { mes: "Mar", produccion: 0, ventas: 28000 },
                    ].map((data, index) => (
                      <div key={data.mes} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex flex-col gap-1 h-48">
                          {/* Barra de Producción */}
                          <div className="flex-1 flex flex-col justify-end">
                            <div
                              className="bg-[#708238] rounded-t-sm transition-all duration-300 hover:bg-[#5a6b2d] cursor-pointer group relative"
                              style={{ height: `${(data.produccion / 3200) * 100}%` }}
                              title={`Producción: ${data.produccion}L`}
                            >
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {data.produccion}L
                              </div>
                            </div>
                          </div>
                          {/* Barra de Ventas */}
                          <div className="flex-1 flex flex-col justify-end">
                            <div
                              className="bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600 cursor-pointer group relative"
                              style={{ height: `${(data.ventas / 28000) * 100}%` }}
                              title={`Ventas: €${data.ventas}`}
                            >
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                €{data.ventas}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{data.mes}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#708238] rounded"></div>
                      <span className="text-sm text-gray-600">Producción (L)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm text-gray-600">Ventas (€)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Campaña Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Variedades procesadas:</span>
                      <span className="text-sm font-medium">4 tipos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Calidad promedio:</span>
                      <span className="text-sm font-medium">Extra Virgen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Temperatura promedio:</span>
                      <span className="text-sm font-medium">24.5°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Días restantes:</span>
                      <span className="text-sm font-medium text-orange-600">45 días</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Precio promedio/L:</span>
                      <span className="text-sm font-medium">€16.42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Margen promedio:</span>
                      <span className="text-sm font-medium text-green-600">34.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pedidos pendientes:</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock disponible:</span>
                      <span className="text-sm font-medium">3,450 L</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Todas las Campañas Tab */}
        <TabsContent value="campanas">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Campañas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar campañas..."
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
                    <SelectItem value="activa">Activa</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                    <SelectItem value="planificada">Planificada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaña</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Kilos Procesados</TableHead>
                    <TableHead>Litros Producidos</TableHead>
                    <TableHead>Rendimiento</TableHead>
                    <TableHead>Ventas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campanas.map((campana) => (
                    <TableRow key={campana.id}>
                      <TableCell className="font-medium">{campana.nombre}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(campana.fechaInicio).toLocaleDateString("es-ES")}</div>
                          <div className="text-gray-500">{new Date(campana.fechaFin).toLocaleDateString("es-ES")}</div>
                        </div>
                      </TableCell>
                      <TableCell>{campana.kilosRecibidos.toLocaleString()} kg</TableCell>
                      <TableCell>{campana.litrosProducidos.toLocaleString()} L</TableCell>
                      <TableCell>{campana.rendimientoPromedio}%</TableCell>
                      <TableCell>€{campana.ventasRealizadas.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campana.estado)}>{campana.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
        </TabsContent>

        {/* Comparativa Tab */}
        <TabsContent value="comparativa">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa entre Campañas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Mejor Rendimiento</h3>
                  <div className="text-2xl font-bold text-green-600">21.5%</div>
                  <p className="text-sm text-gray-600">Campaña 2023</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Mayor Producción</h3>
                  <div className="text-2xl font-bold text-blue-600">16,800 L</div>
                  <p className="text-sm text-gray-600">Campaña 2023</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Mayores Ventas</h3>
                  <div className="text-2xl font-bold text-purple-600">€285,000</div>
                  <p className="text-sm text-gray-600">Campaña 2023</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Más Clientes</h3>
                  <div className="text-2xl font-bold text-orange-600">42</div>
                  <p className="text-sm text-gray-600">Campaña 2024</p>
                </div>
              </div>

              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Gráfico comparativo</p>
                  <p className="text-sm">Rendimiento por campaña</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Actividad Tab */}
        <TabsContent value="actividad">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente de la Campaña</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actividadReciente.map((actividad, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          actividad.tipo === "Maquila" ? "bg-blue-500" : "bg-green-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{actividad.descripcion}</p>
                        <p className="text-sm text-gray-600">
                          {actividad.tipo} • {new Date(actividad.fecha).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{actividad.cantidad}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
