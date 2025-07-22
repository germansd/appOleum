"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Building, Users, Package, FileText, Bell, Shield } from "lucide-react"

export default function ConfiguracionPage() {
  const [moduloMaquila, setModuloMaquila] = useState(true)
  const [moduloVentas, setModuloVentas] = useState(true)
  const [notificacionesEmail, setNotificacionesEmail] = useState(true)
  const [notificacionesStock, setNotificacionesStock] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">Personaliza tu sistema de gestión</p>
      </div>

      <Tabs defaultValue="empresa" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="empresa" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="modulos" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Módulos
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="facturacion" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Facturación
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        {/* Empresa Tab */}
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#708238]" />
                Información de la Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nombre-empresa">Nombre de la Empresa</Label>
                  <Input id="nombre-empresa" defaultValue="Almazara San Miguel S.L." />
                </div>
                <div>
                  <Label htmlFor="cif">CIF/NIF</Label>
                  <Input id="cif" defaultValue="B-23456789" />
                </div>
              </div>

              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" defaultValue="Carretera de Úbeda, Km 12.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input id="ciudad" defaultValue="Baeza" />
                </div>
                <div>
                  <Label htmlFor="provincia">Provincia</Label>
                  <Input id="provincia" defaultValue="Jaén" />
                </div>
                <div>
                  <Label htmlFor="codigo-postal">Código Postal</Label>
                  <Input id="codigo-postal" defaultValue="23440" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" defaultValue="+34 953 740 125" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="info@almazarasanmiguel.es" />
                </div>
              </div>

              <div>
                <Label htmlFor="web">Sitio Web</Label>
                <Input id="web" defaultValue="www.almazarasanmiguel.es" />
              </div>

              <Button className="bg-[#708238] hover:bg-[#5a6b2d]">Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Módulos Tab */}
        <TabsContent value="modulos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#708238]" />
                Configuración de Módulos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Módulo de Maquila</h3>
                    <p className="text-sm text-gray-600">Gestión de procesamiento de aceituna de clientes</p>
                  </div>
                  <Switch checked={moduloMaquila} onCheckedChange={setModuloMaquila} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Módulo de Ventas</h3>
                    <p className="text-sm text-gray-600">Gestión de pedidos y comercialización directa</p>
                  </div>
                  <Switch checked={moduloVentas} onCheckedChange={setModuloVentas} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Gestión de Inventario</h3>
                    <p className="text-sm text-gray-600">Control de stock y productos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Facturación Automática</h3>
                    <p className="text-sm text-gray-600">Generación automática de facturas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Gestión de Campañas</h3>
                    <p className="text-sm text-gray-600">Control por temporadas de cosecha</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="bg-[#708238] hover:bg-[#5a6b2d]">Aplicar Configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuarios Tab */}
        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#708238]" />
                Gestión de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Administra los usuarios del sistema</p>
                <Button className="bg-[#708238] hover:bg-[#5a6b2d]">
                  <Users className="w-4 h-4 mr-2" />
                  Nuevo Usuario
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#708238] rounded-full flex items-center justify-center text-white font-medium">
                      JD
                    </div>
                    <div>
                      <h3 className="font-medium">Juan Díaz</h3>
                      <p className="text-sm text-gray-600">juan@almazara.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Administrador</span>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium">
                      MG
                    </div>
                    <div>
                      <h3 className="font-medium">María García</h3>
                      <p className="text-sm text-gray-600">maria@almazara.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Operador</span>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facturación Tab */}
        <TabsContent value="facturacion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#708238]" />
                Configuración de Facturación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="serie-factura">Serie de Facturación</Label>
                  <Input id="serie-factura" defaultValue="ALM" />
                </div>
                <div>
                  <Label htmlFor="numero-inicial">Número Inicial</Label>
                  <Input id="numero-inicial" type="number" defaultValue="2024001" />
                </div>
              </div>

              <div>
                <Label htmlFor="iva-defecto">IVA por Defecto (%)</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% - Exento</SelectItem>
                    <SelectItem value="4">4% - Superreducido</SelectItem>
                    <SelectItem value="10">10% - Reducido</SelectItem>
                    <SelectItem value="21">21% - General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pie-factura">Pie de Factura</Label>
                <Textarea
                  id="pie-factura"
                  placeholder="Texto que aparecerá en el pie de todas las facturas"
                  defaultValue="Gracias por confiar en Almazara San Miguel S.L. - Aceite de oliva virgen extra de la más alta calidad desde 1952. Forma de pago: Transferencia bancaria a 30 días."
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Opciones de Facturación</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="factura-automatica">Facturación Automática al crear pedido</Label>
                  <Switch id="factura-automatica" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="envio-email">Envío automático por email</Label>
                  <Switch id="envio-email" defaultChecked />
                </div>
              </div>

              <Button className="bg-[#708238] hover:bg-[#5a6b2d]">Guardar Configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificaciones Tab */}
        <TabsContent value="notificaciones">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#708238]" />
                Configuración de Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notif-email">Notificaciones por Email</Label>
                    <p className="text-sm text-gray-600">Recibir notificaciones importantes por correo</p>
                  </div>
                  <Switch id="notif-email" checked={notificacionesEmail} onCheckedChange={setNotificacionesEmail} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notif-stock">Alertas de Stock Bajo</Label>
                    <p className="text-sm text-gray-600">Notificar cuando el stock esté por debajo del mínimo</p>
                  </div>
                  <Switch id="notif-stock" checked={notificacionesStock} onCheckedChange={setNotificacionesStock} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notif-pedidos">Nuevos Pedidos</Label>
                    <p className="text-sm text-gray-600">Notificar cuando se reciba un nuevo pedido</p>
                  </div>
                  <Switch id="notif-pedidos" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notif-maquila">Entradas de Maquila</Label>
                    <p className="text-sm text-gray-600">Notificar nuevas entradas de maquila</p>
                  </div>
                  <Switch id="notif-maquila" defaultChecked />
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="email-notif">Email para Notificaciones</Label>
                <Input id="email-notif" type="email" defaultValue="administracion@almazarasanmiguel.es" />
              </div>

              <Button className="bg-[#708238] hover:bg-[#5a6b2d]">Guardar Preferencias</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seguridad Tab */}
        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#708238]" />
                Configuración de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password-actual">Contraseña Actual</Label>
                  <Input id="password-actual" type="password" />
                </div>

                <div>
                  <Label htmlFor="password-nueva">Nueva Contraseña</Label>
                  <Input id="password-nueva" type="password" />
                </div>

                <div>
                  <Label htmlFor="password-confirmar">Confirmar Nueva Contraseña</Label>
                  <Input id="password-confirmar" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Opciones de Seguridad</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sesion-automatica">Cerrar sesión automáticamente</Label>
                    <p className="text-sm text-gray-600">Cerrar sesión después de 30 minutos de inactividad</p>
                  </div>
                  <Switch id="sesion-automatica" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="log-actividad">Registro de Actividad</Label>
                    <p className="text-sm text-gray-600">Mantener un registro de todas las acciones del usuario</p>
                  </div>
                  <Switch id="log-actividad" defaultChecked />
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-[#708238] hover:bg-[#5a6b2d]">Cambiar Contraseña</Button>
                <Button variant="outline">Descargar Registro de Actividad</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
