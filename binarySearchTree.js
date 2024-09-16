// Build a Node class/factory. 
// It should have an attribute for the data it 
// stores as well as its left and right children.

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Build a Tree class/factory which accepts an array
// when initialized. The Tree class should have a root
// attribute, which uses the return value of buildTree
// which you’ll write next.

class Tree {
  constructor(array) {
    const sortedArray = this.sort(array);
    const uniqueArray = this.removeDuplicates(sortedArray);
    this.root = this.buildTree(uniqueArray);
  }

  // Write a buildTree(array) function that takes an array of data
  // (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
  // and turns it into a balanced binary tree full of Node objects 
  // appropriately placed (don’t forget to sort and remove duplicates!).
  // The buildTree function should return the level-0 root node.

  // sort array  
  sort(array) {
    return array.sort((a, b) => a - b);
  }

  // remove duplicates
  removeDuplicates(array) {
    let uniqueArray = [];

    for (let i = 0; i < array.length; i++) {
      if (i === 0 || array[i] !== array[i - 1]) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  // build balanced BST
  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));

    return node;
  }

}

// Pretty Print
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(dataArray);

prettyPrint(tree.root);
