import React, { useState } from "react";
import { Table, Modal, Pagination, Rating, Tabs, Button, Provider, Avatar } from "@/components";

import '@/components/style/common.less'
import { useTheme } from '@/components/hooks'

export default function App() {
  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Name" },
    { key: "age", name: "Age" },
    { key: "a", name: "TE" },
    { key: "nick", name: "nick" }
  ];

  const data = [
    { id: 1, name: "Alice往", age: 20, a: "34", nick: "Josn" },
    { id: 2, name: "Alice王喜", age: 20, a: "Est", nick: "Josn" },
    { id: 3, name: "Alice张", age: 20 },
    { id: 4, name: "Alice", age: 20 },
    { id: 5, name: "Alice", age: 20 },
    { id: 6, name: "Alice", age: 20 },
    { id: 7, name: "Alice", age: 20 },
    { id: 8, name: "Alice", age: 20 },
    { id: 9, name: "Alice", age: 20 },
    { id: 10, name: "Alice", age: 20 },
    { id: 11, name: "Alice", age: 20 },
    { id: 12, name: "Alice", age: 20 },
    { id: 13, name: "Alice", age: 20 },
    { id: 15, name: "Bob", age: 25 }
  ];

  const tableProps = { columns, data };
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageChange = () => {

  }

  const [theme, toggleTheme] = useTheme()

  return (
    <Provider value={{ baseClass: 'o' }}>
      <div>
        <Avatar></Avatar>
        <Button className="sho" onClick={toggleTheme}>{theme}</Button>
        <Button ghost onClick={toggleTheme}>{theme}</Button>
        <Button size="min" onClick={toggleTheme}>minSize</Button>
        <Button onClick={toggleTheme}>Normal Size</Button>
        <Button size="large" onClick={toggleTheme}>Large size</Button>
        <Button size="large" type="primary" onClick={toggleTheme}>Large size</Button>
      </div>
      <Rating />
      <Table {...tableProps} />
      <button onClick={() => setOpen(!open)}>open</button>
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} onPageCountChange={pageChange}></Pagination>
      <Modal onClose={() => setOpen(!open)} isOpen={open} />
      <Tabs>
        <Tabs.Panel title="ACC">213123</Tabs.Panel>sdfsdfs
        <Tabs.Panel title="ACC">2VBB</Tabs.Panel>
      </Tabs>
    </Provider>
  );
}
