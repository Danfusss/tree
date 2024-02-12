const jsonData = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

function buildTree(services) {
  const tree = {};
  const sortedServices = services.sort((a, b) => a.sorthead - b.sorthead);

  sortedServices.forEach((service) => {
    if (service.head === null) {
      if (!tree[service.id]) tree[service.id] = [];
      tree[service.id].unshift(service);
    } else {
      if (!tree[service.head]) tree[service.head] = [];
      tree[service.head].push(service);
    }
  });

  return tree;
}

function displayService(node, parentElement) {
  const ul = document.createElement("ul");
  node.forEach((service) => {
    const li = document.createElement("li");
    li.textContent = `${service.name} (${service.price})`;
    ul.appendChild(li);

    if (service.node && jsonData.services.some((s) => s.head === service.id)) {
      displayService(
        jsonData.services.filter((s) => s.head === service.id),
        li
      );
    }
  });
  parentElement.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", () => {
  const tree = buildTree(jsonData.services);
  const serviceTreeElement = document.getElementById("serviceTree");
  Object.values(tree).forEach((node) => {
    if (Array.isArray(node) && node[0].head === null) {
      displayService(node, serviceTreeElement);
    }
  });
});
