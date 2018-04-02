export default (_self, h) => {
  return [
    h('Upload', {
      props: {
        multiple: _self.obj.multiple || false,
        type: 'drag',
        action: _self.obj.action || "",
        'max-size': _self.obj.maxSize || 1024
      }
    }, [
      h('div', {
        style: {
          padding: '20px 0'
        }
      }, [
        h('Icon', {
          props: {
            type: 'ios-cloud-upload',
            size: '52',
          },
          style: {
            color: '#3399ff'
          }
        }),
        h('p', '点击或拖拽文件到这里进行上传')
      ])
    ])
  ]
}


export const uploadsConf = {
  config: true,
  action: 'action',
  require: true,
  label: '上传控件',
  multiple: false,
  maxSize: 1024
}
