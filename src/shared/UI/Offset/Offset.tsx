const Offset = ({
    mb,mt,ml,mr
}: any) => {
    let styleCostume: any = {}
    if(mb){
        styleCostume.marginBottom = mb
    }
    if(mt){
        styleCostume.marginTop = mt
    }
    if(ml){
        styleCostume.marginLeft = ml
    }
    if(mr){
        styleCostume.marginRight = mr
    }
  return (
    <div style={styleCostume}></div>
  )
}

export {Offset}