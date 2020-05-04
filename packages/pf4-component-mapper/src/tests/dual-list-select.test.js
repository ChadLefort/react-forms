import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { FormGroup, TextInput } from '@patternfly/react-core';
import { DataToolbar } from '@patternfly/react-core/dist/js/experimental';
import {
  SearchIcon,
  SortAlphaUpIcon,
  SortAlphaDownIcon,
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleLeftIcon,
  AngleRightIcon
} from '@patternfly/react-icons';

import { componentMapper, FormTemplate } from '../index';

describe('DualListSelect', () => {
  let onSubmit;
  let initialProps;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();

    schema = {
      fields: [
        {
          component: 'dual-list-select',
          name: 'dual-list',
          options: [
            {
              value: 'cats',
              label: 'cats'
            },
            {
              value: 'cats_1',
              label: 'cats_1'
            },
            {
              value: 'cats_2',
              label: 'cats_2'
            },
            {
              value: 'zebras',
              label: 'zebras'
            },
            {
              value: 'pigeons',
              label: 'pigeons'
            }
          ]
        }
      ]
    };

    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper,
      FormTemplate,
      schema
    };
  });

  it('renders correctly', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(wrapper.find(FormGroup)).toHaveLength(1);
    expect(wrapper.find(DataToolbar)).toHaveLength(2);
    expect(wrapper.find(TextInput)).toHaveLength(2);
    expect(wrapper.find(SearchIcon)).toHaveLength(2);
    expect(wrapper.find(SortAlphaUpIcon)).toHaveLength(2);
    expect(wrapper.find(SortAlphaDownIcon)).toHaveLength(0);
    expect(wrapper.find(AngleRightIcon)).toHaveLength(1);
    expect(wrapper.find(AngleLeftIcon)).toHaveLength(1);
    expect(wrapper.find(AngleDoubleRightIcon)).toHaveLength(1);
    expect(wrapper.find(AngleDoubleLeftIcon)).toHaveLength(1);
    expect(wrapper.find('.ddorg__pf4-component-mapper__dual-list-select')).toHaveLength(2);
    expect(wrapper.find('.ddorg__pf4-component-mapper__dual-list-select-option')).toHaveLength(schema.fields[0].options.length);
    expect(wrapper.find('.ddorg__pf4-component-mapper__dual-list-select-option-text')).toHaveLength(1);
  });

  it('switch left option', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(AngleRightIcon)
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats'] });
  });

  it('switch left option with holding ctrl', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .simulate('click', { ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(AngleRightIcon)
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'zebras'] });
  });

  it('switch left option with holding shift', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .simulate('click', { shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(AngleRightIcon)
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch left option with holding and removing by ctrl', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .simulate('click', { shiftKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .simulate('click', { ctrlKey: true });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(AngleRightIcon)
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch right option', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': ['cats'] }} />);
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats'] });
    onSubmit.mockClear();
    await act(async () => {
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .simulate('click');
    });
    wrapper.update();
    await act(async () => {
      wrapper
        .find(AngleLeftIcon)
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('switch all to right', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);
    await act(async () => {
      wrapper
        .find(AngleDoubleRightIcon)
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] });
  });

  it('switch all to left', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);
    await act(async () => {
      wrapper
        .find(AngleDoubleLeftIcon)
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('filters options', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
    ).toHaveLength(schema.fields[0].options.length);
    await act(async () => {
      wrapper
        .find('input')
        .first()
        .instance().value = 'cats';
    });
    await act(async () => {
      wrapper
        .find('input')
        .first()
        .simulate('change');
    });
    wrapper.update();

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
    ).toHaveLength(3);
    wrapper
      .find('.ddorg__pf4-component-mapper__dual-list-select')
      .first()
      .find('.ddorg__pf4-component-mapper__dual-list-select-option')
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('filters value', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
    ).toHaveLength(schema.fields[0].options.length);
    await act(async () => {
      wrapper
        .find('input')
        .last()
        .instance().value = 'cats';
    });

    await act(async () => {
      wrapper
        .find('input')
        .last()
        .simulate('change');
    });
    wrapper.update();

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
    ).toHaveLength(3);
    wrapper
      .find('.ddorg__pf4-component-mapper__dual-list-select')
      .last()
      .find('.ddorg__pf4-component-mapper__dual-list-select-option')
      .forEach((option) => expect(option.text()).toEqual(expect.stringContaining('cats')));
  });

  it('sort options', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .find(SortAlphaUpIcon)
        .first()
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .find(SortAlphaDownIcon)
        .first()
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .first()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .text()
    ).toEqual('zebras');
  });

  it('sort value', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .text()
    ).toEqual('zebras');
    await act(async () => {
      wrapper
        .find(SortAlphaUpIcon)
        .last()
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .text()
    ).toEqual('zebras');
    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .text()
    ).toEqual('cats');
    await act(async () => {
      wrapper
        .find(SortAlphaDownIcon)
        .last()
        .parent()
        .props()
        .onClick();
    });
    wrapper.update();

    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .first()
        .text()
    ).toEqual('cats');
    expect(
      wrapper
        .find('.ddorg__pf4-component-mapper__dual-list-select')
        .last()
        .find('.ddorg__pf4-component-mapper__dual-list-select-option')
        .last()
        .text()
    ).toEqual('zebras');
  });

  describe('filtered options', () => {
    it('switch all visible to right', async () => {
      const wrapper = mount(<FormRenderer {...initialProps} />);
      await act(async () => {
        wrapper
          .find('input')
          .first()
          .instance().value = 'cats';
      });

      await act(async () => {
        wrapper
          .find('input')
          .first()
          .simulate('change');
      });
      wrapper.update();
      await act(async () => {
        wrapper
          .find(AngleDoubleRightIcon)
          .parent()
          .props()
          .onClick();
      });
      wrapper.update();

      await act(async () => {
        wrapper.find('form').simulate('submit');
      });

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['cats', 'cats_1', 'cats_2'] });
    });
  });

  describe('filtered value', () => {
    it('switch all visible to left', async () => {
      const wrapper = mount(<FormRenderer {...initialProps} initialValues={{ 'dual-list': schema.fields[0].options.map(({ value }) => value) }} />);
      await act(async () => {
        wrapper
          .find('input')
          .last()
          .instance().value = 'cats';
      });
      await act(async () => {
        wrapper
          .find('input')
          .last()
          .simulate('change');
      });
      wrapper.update();

      await act(async () => {
        wrapper
          .find(AngleDoubleLeftIcon)
          .parent()
          .props()
          .onClick();
      });
      wrapper.update();

      await act(async () => {
        wrapper.find('form').simulate('submit');
      });

      expect(onSubmit).toHaveBeenCalledWith({ 'dual-list': ['zebras', 'pigeons'] });
    });
  });
});
