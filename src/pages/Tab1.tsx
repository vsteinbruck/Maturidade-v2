import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { saveEventsToFile, loadEventsFromFile } from '../fileUtils';

interface Event {
  id: number;
  title: string;
}

const Tab1: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState<string>('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const loadedEvents = await loadEventsFromFile();
    if (loadedEvents) {
      setEvents(loadedEvents);
    }
  };

  const saveEvents = () => {
    saveEventsToFile(events);
  };

  const addEvent = () => {
    const newEvent: Event = { id: Date.now(), title: newEventTitle };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    saveEvents();
  };

  const removeEvent = (id: number) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    saveEvents();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Eventos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {events.map(event => (
            <IonItem key={event.id}>
              <IonLabel>{event.title}</IonLabel>
              <IonButton onClick={() => removeEvent(event.id)} slot="end">
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonItem>
          <IonInput
            value={newEventTitle}
            placeholder="Novo evento"
            onIonChange={(e) => setNewEventTitle(e.detail.value!)}
          />
          <IonButton onClick={addEvent}>
            <IonIcon icon={add} slot="icon-only" />
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
