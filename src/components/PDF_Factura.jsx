import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

function PDF_Factura({ venta, venta_detalles }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      padding: 5,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 10,
    },
  });

  // Create Document Component---------------
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>* THE RICH STORE * FACTURA RUC: 07099999990100</Text>
          <Text>_______________________________________________________</Text>

          <Text>Nº TRANSACCION: {venta.id_transaccion}</Text>
          <Text>
            FECHA:{" "}
            {new Date(venta.fecha).toLocaleString("es-EC", {
              timeZone: "America/Guayaquil",
            })}
          </Text>
          <Text>
            ----------------------------------------------------------
          </Text>
          <Text>CLIENTE: {venta.nom_cliente}</Text>
          <Text>DIRECCION: {venta.dir_cliente}</Text>
          <Text>___________________________________ LISTA DE ARTÍCULOS </Text>
          <Text>________________________________________________________</Text>
          <View style={styles.table}>
            <View style={styles.tableRow} key={venta.id}>
              <Text style={styles.tableCell}>NOMBRE</Text>
              <Text style={styles.tableCell}>CATEGORÍA</Text>
              <Text style={styles.tableCell}>PRECIO</Text>
              <Text style={styles.tableCell}>CANTIDAD</Text>
            </View>
            {venta_detalles.map((venta) => (
              <View style={styles.tableRow} key={venta.id}>
                <Text style={styles.tableCell}>{venta.nombre}</Text>
                <Text style={styles.tableCell}>{venta.categoria}</Text>
                <Text style={styles.tableCell}>${venta.precio}</Text>
                <Text style={styles.tableCell}>{venta.cantidad}</Text>
              </View>
            ))}
          </View>
          <Text>_____________________________________________ RESUMEN</Text>
          <Text>-</Text>
          <Text>Cant. Productos: {venta.cant_productos}</Text>
          <Text>Subtotal: ${venta.subtotal}</Text>
          <Text>Iva 12%: ${venta.iva}</Text>
          <Text>Descuento: ${venta.descuento}</Text>
          <Text>TOTAL: ${venta.total}</Text>
          <Text>Tipo de pago: {venta.tipo_pago}</Text>
          <Text>________________________________________________________</Text>
          <Text>-</Text>
          <Text>-                           GRACIAS POR PREFERIRNOS :D</Text>
          
        </View>
        <View style={styles.footer}>
        
          <Text>Mas productos en www.therichstore.com.ec.2077</Text>
          <Text>________________________________________________________</Text>
        </View>
        
      </Page>
    </Document>
  );
  //-----------------------------------------

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <MyDocument />
        </PDFViewer>
      </div>
    </>
  );
}

export default PDF_Factura;
