// fileUtils.ts

import fs from 'fs';

// Manipulacao de Arquivos

const FILE_NAME = 'events.json';

interface CustomError extends Error {
  code?: string;
}

export const saveEventsToFile = async (events: any[]) => {
  try {
    await fs.promises.writeFile(FILE_NAME, JSON.stringify(events));
  } catch (error) {
    console.error('Erro ao salvar eventos no arquivo:', error);
  }
};

export const loadEventsFromFile = async () => {
  try {
    const eventsString = await fs.promises.readFile(FILE_NAME, 'utf-8');
    return JSON.parse(eventsString);
  } catch (error) {
    const customError = error as CustomError;
    if (customError.code === 'ENOENT') {
      console.warn('Arquivo events.json não encontrado. Criando novo arquivo...');
      await saveEventsToFile([]);
      return [];
    } else {
      console.error('Erro ao carregar eventos do arquivo:', error);
      return null;
    }
  }
};

// manipulacao de Emails

const EMAILS_FILE = 'emails.json';

export const saveEmailToFile = async (email: string) => {
  try {
    let emails: string[] = [];

    // Verifica se o arquivo de e-mails existe
    if (fs.existsSync(EMAILS_FILE)) {
      const emailsString = await fs.promises.readFile(EMAILS_FILE, 'utf-8');
      emails = JSON.parse(emailsString);
    }

    // Adiciona o novo e-mail à lista de e-mails
    emails.push(email);

    // Salva a lista atualizada de e-mails no arquivo
    await fs.promises.writeFile(EMAILS_FILE, JSON.stringify(emails));
  } catch (error) {
    console.error('Erro ao salvar e-mail no arquivo:', error);
  }
};

export const loadEmailsFromFile = async () => {
  try {
    // Verifica se o arquivo de e-mails existe
    if (fs.existsSync(EMAILS_FILE)) {
      const emailsString = await fs.promises.readFile(EMAILS_FILE, 'utf-8');
      return JSON.parse(emailsString);
    } else {
      console.warn('Arquivo emails.json não encontrado.');
      return [];
    }
  } catch (error) {
    console.error('Erro ao carregar e-mails do arquivo:', error);
    return [];
  }
};