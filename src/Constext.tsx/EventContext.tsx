import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  photo: string | null;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  loadEvents: () => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@events');
      if (jsonValue != null) {
        setEvents(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load events from storage', e);
    }
  };

  const saveEvents = async (events: Event[]) => {
    try {
      const jsonValue = JSON.stringify(events);
      await AsyncStorage.setItem('@events', jsonValue);
    } catch (e) {
      console.error('Failed to save events to storage', e);
    }
  };

  const addEvent = (event: Event) => {
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  const updateEvent = (updatedEvent: Event) => {
    const updatedEvents = events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, loadEvents, deleteEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};
