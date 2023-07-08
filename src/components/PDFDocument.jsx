import React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet,PDFViewer } from "@react-pdf/renderer";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function PDFDocument() {
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
  });

  // Create Document Component---------------
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>HOLA K ASE :D</Text>
        </View>
        <View style={styles.section}>
          <Text>TO BIEN OKE</Text>
        </View>
      </Page>
    </Document>
  );
  
  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

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

export default PDFDocument;
