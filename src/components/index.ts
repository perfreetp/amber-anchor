import { AppShell } from './app-shell';
import { Viewport3D } from './viewport3d';
import { ParamPanel } from './param-panel';
import { TeacherPanel } from './teacher-panel';
import { GradingPanel } from './grading-panel';
import { WorkflowGuide } from './workflow-guide';

const elements: [string, CustomElementConstructor][] = [
  ['app-shell', AppShell],
  ['viewport-3d', Viewport3D],
  ['param-panel', ParamPanel],
  ['teacher-panel', TeacherPanel],
  ['grading-panel', GradingPanel],
  ['workflow-guide', WorkflowGuide],
];

for (const [name, ctor] of elements) {
  if (!customElements.get(name)) customElements.define(name, ctor);
}
