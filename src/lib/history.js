// 撤销/重做栈：每步保存 parcels 的结构化快照，上限 50 步
const LIMIT = 50;

export class History {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
    this.onChange = null;
  }

  _emit() {
    if (this.onChange) this.onChange(this.canUndo(), this.canRedo());
  }

  // 在修改前调用 push，传入修改前的深快照与动作描述
  push(snapshot, label) {
    this.undoStack.push({ snapshot, label });
    if (this.undoStack.length > LIMIT) this.undoStack.shift();
    this.redoStack = [];
    this._emit();
  }

  undo(currentSnapshot, label) {
    const prev = this.undoStack.pop();
    if (!prev) return null;
    this.redoStack.push({ snapshot: currentSnapshot, label });
    this._emit();
    return prev.snapshot;
  }

  redo(currentSnapshot) {
    const next = this.redoStack.pop();
    if (!next) return null;
    this.undoStack.push({ snapshot: currentSnapshot, label: next.label });
    this._emit();
    return next.snapshot;
  }

  canUndo() {
    return this.undoStack.length > 0;
  }
  canRedo() {
    return this.redoStack.length > 0;
  }
  undoLabel() {
    return this.undoStack.at(-1)?.label ?? '';
  }
  redoLabel() {
    return this.redoStack.at(-1)?.label ?? '';
  }
  sizes() {
    return { undo: this.undoStack.length, redo: this.redoStack.length, limit: LIMIT };
  }
  clear() {
    this.undoStack = [];
    this.redoStack = [];
    this._emit();
  }
}

export const HISTORY_LIMIT = LIMIT;
