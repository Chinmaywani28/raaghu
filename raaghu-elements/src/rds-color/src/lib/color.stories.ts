import { FormsModule } from '@angular/forms';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { RdsColorComponent } from './rds-color.component';
export default {

  title: 'Elements/Color',
  component: RdsColorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {},
} as Meta;

const Template: Story<RdsColorComponent> = (args: RdsColorComponent) => ({
  props: args,
});


export const Default: Story<RdsColorComponent> = (args) => ({
  props: args,
});
Default.args = {
  header: 'Color',
  defaultValue: 1,
  itemList: [
    { id: 1, color: '#FFFFFF' },
    { id: 2, color: '#FDD2FF' },
    { id: 3, color: '#BFEAFF' },
  ]
};
