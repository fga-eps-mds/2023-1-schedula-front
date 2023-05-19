import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from 'react';
import { GrDocumentPdf } from 'react-icons/gr';

export function TutorialFileCard() {
  return (
    <div
      style={{ borderBottom: '2px solid rgb(255,255,255)', borderRadius: 1 }}
    >
      <p style={{ marginBottom: 3 }}>
        <GrDocumentPdf
          size={25}
          style={{
            display: 'inline',
            marginRight: 15,
            marginLeft: 5,
            filter: 'invert(1)',
          }}
        />
      </p>
    </div>
  );
}
