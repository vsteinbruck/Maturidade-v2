import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { saveEmailToFile } from '../fileUtils'; 
import { loadEmailsFromFile } from '../fileUtils'; 
import { loadEventsFromFile } from '../fileUtils'; 
import axios from 'axios'; 

const Tab2: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [events, setEvents] = useState<any[]>([]);

  const handleRegisterEmail = () => {
    saveEmailToFile(email);
    // Lógica para registrar o e-mail em um arquivo JSON
  };

  const handleSendEmail = async () => {
    try {
      // Carregar os eventos do arquivo JSON
      const eventsData = await loadEventsFromFile();

      // Construir o conteúdo do e-mail com base na lista de eventos
      const eventList = eventsData.map((event: any) => `- ${event.title}`).join('\n');
      const emailContent = `Olá,\n\nSegue abaixo a lista de eventos:\n\n${eventList}`;

      // Configurar o corpo da solicitação
      const requestBody = {
        sender: { email: 'info@maturidade.com' },
        to: [{ email }],
        subject: 'Lista de Eventos',
        textContent: emailContent
      };

      // Fazer solicitação para enviar e-mail usando Axios
      await axios.post('https://api.sendinblue.com/v3/smtp/email', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'Y3AtSxYsCHM82BwQ1' // Substitua pela sua chave de API Sendinblue
        }
      });

      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Envio de E-mail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          value={email}
          placeholder="Digite seu e-mail"
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonButton onClick={handleRegisterEmail}>Registrar E-mail</IonButton>
        <IonButton onClick={handleSendEmail}>Enviar E-mail</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;