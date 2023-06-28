export const globalList: string[] = [];

export function loadGlobalList(): string[] {
  const storedList = localStorage.getItem('globalList');
  return storedList ? JSON.parse(storedList) : [];
  return globalList;
}

export function saveGlobalList(list: string[]): void {
  localStorage.setItem('globalList', JSON.stringify(list));
}

export function addItemToList(item: string) {
  if (!globalList.includes(item)) {
    globalList.push(item);
    saveGlobalList(globalList); // Salvar a lista após adicionar o item
  }
}
