/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuData示例，子菜单和父菜单结构一致：
 * [
 *  {
 *    name: '菜单key',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '',
 *      target: '',
 *      title: '菜单标题',
 *      hidden: '菜单是否隐藏',
 *      permission: ['页面权限/按钮权限']
 *    },
 *    children: [子菜单配置]
 *  }
 * ]
 **/
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'

const { Item, SubMenu } = Menu

export default {
  name: 'SiderMenu',
  props: {
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    // 获取一级菜单keys
    rootSubmenuKeys: (vm) => {
      let keys = []
      vm.menuData.forEach(item => {
        keys.push(item.path)
      })
      return keys
    }
  },
  created () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    '$route': function () {
      this.updateMenu()
    }
  },
  methods: {
    // 创建icon
    renderIcon (icon) {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const props = {}
      typeof (icon) === 'object' ? props.component = icon : props.type = icon

      return (
        <Icon {... { props } }/>
      )
    },
    // 创建叶子节点菜单
    renderMenuItem (menu, pIndex, index) {
      const target = (menu.meta && menu.meta.target) || false
      const tag = target ? 'a' : 'router-link'
      const props = { to: { name: menu.name } }
      const attrs = { href: menu.path, target: target }
      const icon = menu.meta && menu.meta.icon

      return (
        <Item {...{ key: menu.path ? menu.path : 'item_' + pIndex + '_' + index }}>
          <tag {...{ props, attrs }}>
            {this.renderIcon(icon)}
            <span>{menu.meta.title}</span>
          </tag>
        </Item>
      )
    },
    // 创建有子菜单的菜单
    renderSubMenu (menu, pIndex, index) {
      const itemArr = []
      const pIndex_ = pIndex + '_' + index
      const icon = menu.meta && menu.meta.icon
      if (menu.children) {
        menu.children.forEach((item, i) => {
          itemArr.push(this.renderItem(item, pIndex_, i))
        })
      }
      return (
        <SubMenu {...{ key: menu.path ? menu.path : 'submenu_' + pIndex_ }}>
          <span slot="title">
            {this.renderIcon(icon)}
            <span>{menu.title}</span>
          </span>
          {itemArr}
        </SubMenu>
      )
    },
    // 渲染菜单项
    renderItem (menu, pIndex, index) {
      const meta = menu.meta
      if (meta && meta.hidden) {
        return null
      }
      return menu.children ? this.renderSubMenu(menu, pIndex, index) : this.renderMenuItem(menu, pIndex, index)
    },
    // 渲染菜单
    renderMenu (menuTree) {
      return menuTree.map((item, i) => {
        const meta = item.meta
        if (meta && meta.hidden) {
          return null
        }
        return this.renderItem(item, '0', i)
      })
    },
    // 只展开当前父级菜单
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    updateMenu () {
      const routes = this.$route.matched.concat()
      const openKeys = []

      this.selectedKeys = [routes.pop().path]
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }

      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    }
  },
  render () {
    const props = {
      mode: this.mode,
      theme: this.theme,
      openKeys: this.openKeys
    }
    const on = {
      select: obj => {
        this.selectedKeys = obj.selectedKeys
        this.$emit('select', obj)
      },
      openChange: this.onOpenChange
    }

    return (
      <Menu vModel={this.selectedKeys} {...{ props, on }}>
        {this.renderMenu(this.menuData)}
      </Menu>
    )
  }
}
