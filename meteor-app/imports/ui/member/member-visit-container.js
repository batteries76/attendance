import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
const debug = require('debug')('att:visit')
import { ReactiveVar } from 'meteor/reactive-var'
import MemberVisit from '/imports/ui/member/member-visit'
import Members from '/imports/api/members/members'

const validPin = new ReactiveVar(false)
const isDefaultPin = new ReactiveVar(false)

export default withTracker((props) => {
  const membersHandle = Meteor.subscribe('all.members')
  const loading = !membersHandle.ready()
  const id = props.match.params.id
  const member = Members.findOne(id)
  isDefaultPin.set(member.pin == '1234')

  function checkPin(pin) {
    const valid = pin == member.pin
    validPin.set(valid)
  }

  function clearPin() {
    validPin.set(false)
  }

  function recordVisit({ duration }) {
    clearPin()
    if (!member.isHere) {
      debug('member arriving', id, duration)
      Meteor.call('arrive', id, duration)
    } else {
      debug('member departure', id)
      Meteor.call('depart', id)
    }

  }

  function cancelClick() {
    props.history.goBack()
  }

  function setCustomPin(id, pin) {
    console.log('setting custom pin: ', pin)
    isDefaultPin.set(false)
    console.log('updating isDefaultPin', isDefaultPin.get())
    Meteor.call('members.setPin', id, pin)
  }

  return {
    recordVisit,
    loading,
    member,
    clearPin,
    checkPin,
    validPin: validPin.get(),
    cancelClick,
    isDefaultPin: isDefaultPin.get(),
    setCustomPin,
  }
})(MemberVisit)