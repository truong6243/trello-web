import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import { Feedback } from '@dnd-kit/dom';

// Giả định bạn import các UI components từ file của bạn
import { Actions, Container, Item, Handle } from '../../components/index.js';


// Khởi tạo dữ liệu mẫu
const initialItems = {
  A: ['A1', 'A2', 'A3', 'A4'],
  B: ['B1', 'B2', 'B3'],
  C: ['C1', 'C2'],
  D: [],
};

const COLORS = {
  A: '#7193f1',
  B: '#FF851B',
  C: '#2ECC40',
  D: '#ff3680',
};

export function MultipleLists() {
  const [items, setItems] = useState(initialItems);
  const [columns] = useState(Object.keys(initialItems));
  
  // Dùng để lưu lại trạng thái trước khi kéo, phục hồi nếu người dùng hủy (nhấn ESC)
  const snapshot = useRef(null); 

  return (
    <DragDropProvider
      sensors={sensors}
      onDragStart={useCallback(() => {
        snapshot.current = structuredClone(items);
      }, [items])}
      onDragOver={useCallback((event) => {
        const { source } = event.operation;

        // Bỏ qua nếu đang kéo nguyên một cột
        if (source?.type === 'column') {
          return;
        }

        // Tự động di chuyển item giữa các cột hoặc trong cùng một cột
        setItems((currentItems) => move(currentItems, event));
      }, [])}
      onDragEnd={useCallback((event) => {
        // Nếu hành động kéo bị hủy, khôi phục lại dữ liệu ban đầu
        if (event.canceled) {
          setItems(snapshot.current);
        }
      }, [])}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
        {columns.map((column, columnIndex) => {
          const rows = items[column];

          return (
            <SortableColumn
              key={column}
              id={column}
              index={columnIndex}
              rows={rows}
            />
          );
        })}
      </div>
    </DragDropProvider>
  );
}

const SortableColumn = memo(function SortableColumn({ rows, id, index }) {
  const { handleRef, isDragging, ref } = useSortable({
    id,
    accept: ['column', 'item'],
    collisionPriority: CollisionPriority.Low,
    type: 'column',
    index,
  });

  const actions = useMemo(() => {
    return (
      <Actions>
        <Handle ref={handleRef} />
      </Actions>
    );
  }, [handleRef]);

  return (
    <Container
      ref={ref}
      label={id}
      actions={actions}
      shadow={isDragging}
    >
      {rows.map((itemId, itemIndex) => (
        <SortableItem
          key={itemId}
          id={itemId}
          column={id}
          index={itemIndex}
        />
      ))}
    </Container>
  );
});

const SortableItem = memo(function SortableItem({ id, column, index }) {
  const { handleRef, ref, isDragging } = useSortable({
    id,
    group: column,
    accept: 'item',
    type: 'item',
    plugins: [Feedback.configure({ feedback: 'clone' })],
    index,
    data: { group: column },
  });

  return (
    <Item
      ref={ref}
      actions={
        <Actions>
          <Handle ref={handleRef} />
        </Actions>
      }
      accentColor={COLORS[column]}
      shadow={isDragging}
    >
      {id}
    </Item>
  );
});