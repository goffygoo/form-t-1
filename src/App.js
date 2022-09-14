import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [popup, setPopUp] = useState(-1)
  const [preview, setPreview] = useState(false)
  const [form, setForm] = useState([])
  const [item, setItem] = useState({})

  const setItemVal = (key, value) => {
    setItem(pre => {
      return {
        ...pre,
        [key]: value
      }
    })
  }

  const validate = () => {
    if (item["type"] === undefined || item["fieldName"] === undefined || item["fieldId"] === undefined) return false

    if (!item["fieldName"].trim() || !item["fieldId"].trim()) return false

    if (item["type"] === "field" && !item["isPlural"]) return false

    return true
  }

  return (
    <>
      {
        popup !== -1 ?
          <div className='popup'>
            <div className='popupContainer'>
              <h1 className='popupHead'>New Form Item</h1>

              <div className='popupRadio' onClick={e => {
                if (e.target.value) {
                  setItemVal("type", e.target.value)
                }
              }}>
                <p>Item Type</p>

                <label className='popupRadioLabel'>
                  <input type="radio" name="type" value="container" />
                  Container
                </label>
                <label className='popupRadioLabel'>
                  <input type="radio" name="type" value="field" />
                  Field
                </label>
              </div>

              <div className='popupInput'>
                <p>Field Name</p>
                <input spellCheck="false" onChange={e => setItemVal("fieldName", e.target.value)} />
              </div>

              <div className='popupInput'>
                <p>Field Id</p>
                <input spellCheck="false" onChange={e => setItemVal("fieldId", e.target.value)} />
              </div>

              {
                item["type"] === "field" ?
                  <div className='popupRadio'>
                    <p>Is plural field ?</p>

                    <label className='popupRadioLabel'>
                      <input type="radio" name="isPlural" value="yes" onChange={e => setItemVal("isPlural", e.target.value)} checked={item["isPlural"] === "yes"} />
                      Yes
                    </label>
                    <label className='popupRadioLabel'>
                      <input type="radio" name="isPlural" value="no" onChange={e => setItemVal("isPlural", e.target.value)} checked={item["isPlural"] === "no"} />
                      No
                    </label>
                  </div>
                  : null
              }

              <div className='popupButtons'>
                <button onClick={() => {
                  setPopUp(-1)
                  setItem({})
                }}>Cancel</button>
                <button onClick={() => {
                  if (!validate()) return alert("Fill all the fields !!!")

                  setForm(([...arr]) => {
                    arr.splice(popup, 0, { ...item, edit: false })
                    return arr
                  })
                  setItem({})
                  setPopUp(-1)
                }}>Create</button>
              </div>

            </div>
          </div>
          : null
      }

      <div className='navbar'>
        <p>My Form Builder</p>
        <button className={preview ? 'previewButton' : ''} onClick={() => setPreview(v => !v)}>{preview ? "Edit" : "Preview "}</button>
      </div>
      {
        !preview ?
          <div>
            {
              form.map((obj, i) => {
                let next = null

                if (obj["type"] === "field") {
                  if (obj["isPlural"] === "no") {
                    next = (
                      <div className='singleField'>
                        {
                          obj.edit ?
                            <input value={obj["fieldName"]} onChange={e => {
                              setForm(([...arr]) => {
                                arr[i]["fieldName"] = e.target.value
                                return arr;
                              })
                            }} />
                            : <p>{obj["fieldName"]}</p>
                        }
                        <input />
                        <img src={obj.edit ? "/save.png" : "/edit.svg"} alt="edit" onClick={() => {
                          setForm(([...arr]) => {
                            arr[i].edit = !arr[i].edit
                            return arr;
                          })
                        }} />
                      </div>
                    )

                  } else {
                    next = (
                      <div className='multiField'>
                        <div className='multiFieldHead'>
                          {
                            obj.edit ?
                              <input value={obj["fieldName"]} onChange={e => {
                                setForm(([...arr]) => {
                                  arr[i]["fieldName"] = e.target.value
                                  return arr;
                                })
                              }} />
                              : <p>{obj["fieldName"]}</p>
                          }
                          <img src={obj.edit ? "/save.png" : "/edit.svg"} alt="edit" onClick={() => {
                            setForm(([...arr]) => {
                              arr[i].edit = !arr[i].edit
                              return arr;
                            })
                          }} />
                        </div>
                        {
                          obj["childs"] ?
                            obj["childs"].map(() => {
                              return (
                                <div className='singleField'>
                                  <p>Name</p>
                                  <input />
                                </div>
                              )
                            })
                            : null
                        }

                        <p className='multiFieldAdd' onClick={() => {
                          setForm(([...arr]) => {
                            if (arr[i].childs === undefined) {
                              arr[i].childs = [""]
                            } else {
                              arr[i].childs.push("")
                            }

                            return arr
                          })
                        }}>Add Entry</p>

                      </div>
                    )
                  }
                } else {
                  next = (
                    <div className='containerField'>
                      <div className='containerFieldHead'>
                        <div className='containerFieldHeadText'>
                          {
                            obj.edit ?
                              <input value={obj["fieldName"]} spellCheck="false" onChange={e => {
                                setForm(([...arr]) => {
                                  arr[i]["fieldName"] = e.target.value
                                  return arr;
                                })
                              }} />
                              : <p>{obj["fieldName"]}</p>
                          }
                        </div>
                        <span />
                        <img src={obj.edit ? "/save.png" : "/edit.svg"} alt="edit" onClick={() => {
                          setForm(([...arr]) => {
                            arr[i].edit = !arr[i].edit
                            return arr;
                          })
                        }} />
                      </div>

                      {
                        form[i].childs ?
                          form[i].childs.map((v, j) => {
                            return (
                              <>
                                <div className='addField' onClick={() => {
                                  setForm(([...arr]) => {
                                    if (arr[i].childs === undefined) {
                                      arr[i].childs = []
                                    }

                                    arr[i].childs.splice(j, 0, { fieldName: "Name", edit: false })

                                    return arr
                                  })
                                }}>
                                  <span />
                                  <div>
                                    <p>
                                      + Add Field Container
                                    </p>
                                  </div>
                                  <span />
                                </div>

                                <div className='singleField'>
                                  {
                                    v.edit ?
                                      <input value={v.fieldName} onChange={e => {
                                        setForm(([...arr]) => {
                                          arr[i]["childs"][j]["fieldName"] = e.target.value
                                          return arr;
                                        })
                                      }} />
                                      : <p>{v.fieldName}</p>
                                  }
                                  <input />
                                  <img src={v.edit ? "/save.png" : "/edit.svg"} alt="edit" onClick={() => {
                                    setForm(([...arr]) => {
                                      arr[i]["childs"][j]["edit"] = !arr[i]["childs"][j]["edit"]
                                      return arr;
                                    })
                                  }} />
                                </div>
                              </>
                            )
                          })
                          : null
                      }

                      <div className='addField' onClick={() => {
                        setForm(([...arr]) => {
                          if (arr[i].childs === undefined) {
                            arr[i].childs = []
                          }

                          arr[i].childs.push({ fieldName: "Name", edit: false })


                          return arr
                        })
                      }}>
                        <span />
                        <div>
                          <p>
                            + Add Field Container
                          </p>
                        </div>
                        <span />
                      </div>
                    </div>
                  )
                }

                return (
                  <>
                    <div className='addField' onClick={() => setPopUp(i)}>
                      <span />
                      <div>
                        <p>
                          + Add Field
                        </p>
                      </div>
                      <span />
                    </div>
                    {next}
                  </>
                )
              })
            }

            <div className='addField' onClick={() => setPopUp(form.length)}>
              <span />
              <div>
                <p>
                  + Add Field
                </p>
              </div>
              <span />
            </div>

          </div>

          : <div className='preview'>
            {
              form.map(obj => {
                if (obj.type === "field") {
                  if (obj.isPlural === "no") {
                    return (
                      <div className='previewSingle'>
                        <p>{obj.fieldName}</p>
                        <div />
                      </div>
                    )
                  } else {
                    return (
                      <div className='previewMulti'>
                        <h1>{obj.fieldName}</h1>
                        <div className='previewMultiChild'>
                          {
                            obj.childs ?
                              obj.childs.map(v => {
                                return (
                                  <div className='previewSingle'>
                                    <p>Name</p>
                                    <div />
                                  </div>
                                )
                              })
                              : null
                          }
                        </div>
                      </div>
                    )
                  }
                }

                return (
                  <div className='fieldContainer'>
                    <h1>{obj.fieldName}</h1>
                    {
                      obj.childs ?
                        obj.childs.map(v => {
                          return (
                            <div className='previewSingle'>
                              <p>Name</p>
                              <div />
                            </div>
                          )
                        })
                        : null
                    }
                  </div>
                )
              })
            }
          </div>
      }
    </>
  )
}
