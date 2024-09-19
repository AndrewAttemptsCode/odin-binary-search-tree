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

  // insert a node with given value
  insert(value) {
    this.root = this.insertRec(this.root, value);
  }

  insertRec(root, value) {
    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this.insertRec(root.left, value);
    } else if (value > root.data) {
      root.right = this.insertRec(root.right, value);
    }

    return root;
  }

  // delete a node with given value
  deleteItem(value) {
    this.root = this.deleteRec(this.root, value);
  }

  deleteRec(root, value) {
    if (root === null) return null;

    if (value < root.data) {
      root.left = this.deleteRec(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteRec(root.right, value);
    } else {
      // Case 1: Leaf node (no children)
      if (root.left === null && root.right === null) return null;
      // Case 2: One child (left or right)
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      // Case 3: Two children
      const minValue = this.findMin(root.right);
      root.data = minValue;
      root.right = this.deleteRec(root.right, minValue);
    }

    return root;
  }

  findMin(root) {
    let current = root;
    while (current.left !== null) {
      current = current.left;
    }
    
    return current.data;
  }

  // find(value) returns the node with the given value.
  find(value) {
    return this.findRec(this.root, value);
  }

  findRec(root, value) {
    if (root === null || root.data === value) return root;

    if (value < root.data) {
      return this.findRec(root.left, value);
    } else {
      return this.findRec(root.right, value);
    }
  }

  // levelOrder(callback) function that accepts
  // a callback function as its parameter.

  levelOrder(callback) {
    if (typeof callback !== 'function') throw new Error('A Callback function is required.');

    const queue = [];

    if (this.root !== null) queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  //inOrder(callback) function that accepts 
  // a callback function as its parameter.

  inOrder(callback) {
    if (typeof callback !== 'function') throw new Error('A callback function is required');

    const stack = [];
    let current = this.root;

    while (stack.length > 0 || current !== null) {

      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      callback(current);
      current = current.right;
    }
  }

  //preOrder(callback) function that accepts 
  // a callback function as its parameter.

  preOrder(callback) {
    if (typeof callback !== 'function') throw new Error('A callback function is required.');

    const stack = [];
    if (this.root !== null) stack.push(this.root);

    while (stack.length > 0) {
      const current = stack.pop();
      callback(current);
    }

    if (current.right !== null) stack.push(current.right);
    if (current.left !== null) stack.push(current.left);
  }

  //postOrder(callback) function that accepts 
  // a callback function as its parameter.

  postOrder(callback) {
    if (typeof callback !== 'function') throw new Error('A callback function is required.');

    const stack1 = [];
    const stack2 = [];

    if (this.root !== null) stack1.push(this.root);

    while (stack1.length > 0) {
      const current = stack1.pop();
      stack2.push(current);

      if (current.left !== null) stack1.push(current.left);
      if (current.right !== null) stack1.push(current.right);
    }

    while (stack2.length > 0) {
      const node = stack2.pop();
      callback(node);
    }
  }

  printInOrder() {
    const result = [];

    this.inOrder((node) => {
      result.push(node.data);
    });

    return result;
  }

  // height(node) function that returns the given node’s height to a leaf node.
  height(node) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  // depth(node) function that returns the given node’s depth to the root node.
  depth(node) {
    if (!this.root || !node) return -1; // Return -1 if root or node is invalid
    let current = this.root;
    let depthCount = 0;

    // Traverse the tree to find the node
    while (current !== null) {
        if (node.data === current.data) {
            return depthCount; // Return the depth when node is found
        } else if (node.data < current.data) {
            current = current.left; // Go left if node is smaller
        } else {
            current = current.right; // Go right if node is larger
        }
        depthCount++;
    }

    // If the node was not found in the tree, return -1
    return -1;
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

// Tests
const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(dataArray);

// Balance Node Tree
console.log("\nBalanced Binary Search Tree:\n");
prettyPrint(tree.root);

// Tree node Insertion
console.log("\nWith insertion:\n");
tree.insert(50);
prettyPrint(tree.root);

// Tree node Deletion
console.log("\nWith deletion\n");
tree.deleteItem(23);
prettyPrint(tree.root);

// Find Node
const found = tree.find(7);
if (found !== null) {
  console.log(`\nFound node: ${found.data}\n`);
} else {
  console.log("\nNode not found.\n");
}

const notFound = tree.find(100);
if (notFound !== null) {
  console.log(`\nFound node: ${notFound.data}\n`);
} else {
  console.log("\nNode not found.\n");
}

// Print result of array in an ordered array
console.log(tree.printInOrder());

// Print heigh of given node
console.log(tree.height(tree.root));

// Print depth of given node
console.log(tree.depth(tree.root));