import { Button, Textarea } from '@chakra-ui/react';
import { Input } from '@/components/form-fields';

export function NotificationForm() {
  return (
    <form>
      <p style={{ fontSize: 20 }}>Mensagem: (opcional)</p>
      <Textarea
        placeholder="Adicione uma pendência"
        size="lg"
        style={{ marginTop: 6, marginBottom: 15, height: 200, resize: 'none' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Button type="submit" size="lg" width="100%">
          Adicionar
        </Button>
      </div>
    </form>
  );
}
